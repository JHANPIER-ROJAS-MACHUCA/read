const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "postgres",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false }
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.log("Error de conexión:", err);
  } else {
    console.log("Conectado a Supabase:", res.rows);
  }
});

module.exports = pool;
