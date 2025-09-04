import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
import geolib from "geolib";

dotenv.config();

const app = express();
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
});

db.connect((err) => {
  if (err) console.error("MySQL connection failed:", err);
  else console.log("MySQL connected");
});

// POST /addSchool - Add new school
app.post("/addSchool", (req, res) => {
  const { name, address, latitude, longitude } = req.body;
  if (!name || !address || latitude == null || longitude == null) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql =
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, address, latitude, longitude], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "School added", id: result.insertId });
  });
});

// GET /listSchools - List schools sorted by proximity
app.get("/listSchools", (req, res) => {
  const { user_latitude, user_longitude } = req.query;
  if (!user_latitude || !user_longitude) {
    return res.status(400).json({ error: "User location is required" });
  }

  db.query("SELECT * FROM schools", (err, schools) => {
    if (err) return res.status(500).json({ error: err.message });

    const userLoc = {
      latitude: parseFloat(user_latitude),
      longitude: parseFloat(user_longitude),
    };

    const sorted = schools
      .map((school) => ({
        ...school,
        distance_meters: geolib.getDistance(userLoc, {
          latitude: school.latitude,
          longitude: school.longitude,
        }),
      }))
      .sort((a, b) => a.distance_meters - b.distance_meters);

    res.json(sorted);
  });
});

// Start server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
