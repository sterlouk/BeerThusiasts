import mysql from 'mysql2/promise';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true
});

async function runSQLFile() {
  try {
    // Get filename from command line argument, default to expand_data.sql
    const filename = process.argv[2] || 'expand_data.sql';
    const sql = fs.readFileSync(filename, 'utf8');

    // Remove comments (lines starting with --)
    const lines = sql.split('\n');
    const cleanLines = lines.filter(line => !line.trim().startsWith('--'));
    const cleanSQL = cleanLines.join('\n');

    // Split by semicolon and filter out empty statements
    const statements = cleanSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    console.log(`Found ${statements.length} SQL statements to execute`);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement) {
        try {
          console.log(`Executing statement ${i + 1}/${statements.length}:`, statement.substring(0, 50) + '...');
          await pool.execute(statement + ';');
          console.log(`✓ Statement ${i + 1} executed successfully`);
        } catch (stmtError) {
          console.error(`✗ Error in statement ${i + 1}:`, stmtError.message);
          console.error('Statement was:', statement.substring(0, 100));
          // Continue with next statement instead of stopping
        }
      }
    }

    console.log('Database expansion completed successfully!');
  } catch (error) {
    console.error('Error reading or processing SQL file:', error);
  } finally {
    await pool.end();
  }
}

runSQLFile();