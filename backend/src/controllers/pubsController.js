import { pool } from "../db.js";

export const getPubs = async (req, res) => {
  try {
    // Dynamically inspect pub columns and build a safe SELECT so we don't
    // reference non-existent columns (avoids ER_BAD_FIELD_ERROR).
    const [[{ dbName }]] = await pool.query(`SELECT DATABASE() AS dbName`);

    const [colsRes] = await pool.query(
      `SELECT COLUMN_NAME FROM information_schema.columns WHERE table_schema = ? AND table_name = ?`,
      [dbName, 'pub']
    );
    const pubCols = colsRes.map((c) => c.COLUMN_NAME.toLowerCase());

    const pubNameCandidates = ['pub_name', 'name', 'pubname'].filter((c) => pubCols.includes(c));
    const locationCandidates = ['location', 'address', 'area'].filter((c) => pubCols.includes(c));
    const idCandidates = ['pub_id', 'id', 'pubid'].filter((c) => pubCols.includes(c));

    // If none of the expected columns exist, fall back to selecting all columns.
    if (pubNameCandidates.length === 0 && locationCandidates.length === 0 && idCandidates.length === 0) {
      const [rows] = await pool.query(`SELECT * FROM pub`);
      return res.json(rows);
    }

    const selectParts = [];
    if (idCandidates.length > 0) selectParts.push(`p.${idCandidates[0]} AS pub_id`);
    if (pubNameCandidates.length > 0) selectParts.push(`COALESCE(${pubNameCandidates.map((c) => `p.${c}`).join(', ')}) AS pub_name`);
    if (locationCandidates.length > 0) selectParts.push(`COALESCE(${locationCandidates.map((c) => `p.${c}`).join(', ')}) AS location`);

    const sql = `SELECT ${selectParts.join(', ')} FROM pub p`;
    const [rows] = await pool.query(sql);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};

export const getPubsNeedsRestock = async (req, res) => {
  try {
    const [[{ dbName }]] = await pool.query(`SELECT DATABASE() AS dbName`);
    const schema = dbName;

    // Inspect available columns for pub, beer and pubhasbeer to build a safe query
    const inspect = async (table) => {
      const [cols] = await pool.query(
        `SELECT COLUMN_NAME FROM information_schema.columns WHERE table_schema = ? AND table_name = ?`,
        [schema, table]
      );
      return cols.map((c) => c.COLUMN_NAME.toLowerCase());
    };

    const pubCols = await inspect('pub').catch(() => []);
    const beerCols = await inspect('beer').catch(() => []);
    const phCols = await inspect('pubhasbeer').catch(() => []);

    const pubNameCols = ['pub_name', 'name', 'pubname'].filter((c) => pubCols.includes(c));
    const beerNameCols = ['name', 'beer_name', 'title'].filter((c) => beerCols.includes(c));

    const selectParts = ['ph.pub_id'];
    if (pubNameCols.length > 0) selectParts.push(`COALESCE(${pubNameCols.map((c) => `p.${c}`).join(', ')}) AS pub_name`);
    selectParts.push('ph.beer_id');
    if (beerNameCols.length > 0) selectParts.push(`COALESCE(${beerNameCols.map((c) => `b.${c}`).join(', ')}) AS beer_name`);
    if (phCols.includes('quantity_available')) selectParts.push('ph.quantity_available');
    if (phCols.includes('reorder_threshold')) selectParts.push('ph.reorder_threshold');
    if (phCols.includes('remaining_until_reorder')) selectParts.push('ph.remaining_until_reorder');

    const whereParts = [];
    if (phCols.includes('remaining_until_reorder')) {
      whereParts.push('(ph.remaining_until_reorder IS NOT NULL AND ph.remaining_until_reorder <= 0)');
    }
    if (phCols.includes('reorder_threshold') && phCols.includes('quantity_available')) {
      whereParts.push('(ph.reorder_threshold IS NOT NULL AND ph.quantity_available <= ph.reorder_threshold)');
    }

    if (whereParts.length === 0) {
      // No meaningful restock criteria available
      return res.json([]);
    }

    const sql = `
      SELECT ${selectParts.join(', ')}
      FROM pubhasbeer ph
      LEFT JOIN pub p ON ph.pub_id = p.pub_id
      LEFT JOIN beer b ON ph.beer_id = b.beer_id
      WHERE ${whereParts.join(' OR ')}
      ORDER BY ${phCols.includes('remaining_until_reorder') ? 'ph.remaining_until_reorder ASC,' : ''} ${phCols.includes('quantity_available') ? 'ph.quantity_available ASC' : 'ph.beer_id ASC'}
    `;

    const [rows] = await pool.query(sql);
    res.json(rows);
  } catch (err) {
    console.error('getPubsNeedsRestock error', err);
    res.status(500).json({ error: 'Database error' });
  }
};
