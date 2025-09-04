import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

// connect to db
db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL");
});

// Routes
app.post("/addSchool", (req, res) => {
  const { name, address, latitude, longitude } = req.body;
  const sql = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, address, latitude, longitude], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "School added", id: result.insertId });
  });
});

app.get("/listSchools", (req, res) => {
  const sql = "SELECT * FROM schools";
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});

app.get("/",(req,res)=>{
    res.status(200).send("Welcome to School Management Inventory API");
})

// start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
