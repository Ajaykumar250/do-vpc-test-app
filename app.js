const express = require("express");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  ssl: { rejectUnauthorized: false }
});

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send("✅ Connected to Managed DB via VPC: " + result.rows[0].now);
  } catch (err) {
    res.send("❌ DB connection failed: " + err.message);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("App running");
});
