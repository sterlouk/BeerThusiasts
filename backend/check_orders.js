import mysql from 'mysql2/promise';

async function checkOrders() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ster',
    database: 'beerthusiasts'
  });

  try {
    // Check orderhasbeer count
    const [count] = await connection.query("SELECT COUNT(*) as total FROM orderhasbeer");
    console.log(`Total orderhasbeer rows: ${count[0].total}`);

    // Check order 1 details
    console.log("\nOrder 1 details:");
    const [order1] = await connection.query(
      `SELECT oh.order_id, oh.beer_id, oh.quantity, oh.price_per_unit, oh.line_total 
       FROM orderhasbeer oh WHERE oh.order_id = 1`
    );
    console.log(order1);

    // Check all orders
    console.log("\nAll orders in orders table:");
    const [orders] = await connection.query("SELECT order_id, status, pub_id FROM orders");
    console.log(orders);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await connection.end();
  }
}

checkOrders();
