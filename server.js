const express = require('express');
const mysql = require('mysql2/promise');
const geolib = require('geolib');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

app.post('/addSchool', async (req, res) => {
    const { name, address, latitude, longitude } = req.body;
    if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: 'Missing or invalid fields.' });
    }
    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    try {
        await db.execute(query, [name, address, latitude, longitude]);
        res.status(201).json({ message: 'School added!' });
    } catch (error) {
        res.status(500).json({ error: 'Could not add school.' });
    }
});

app.get('/listSchools', async (req, res) => {
    const { user_latitude, user_longitude } = req.query;
    const userLocation = { latitude: parseFloat(user_latitude), longitude: parseFloat(user_longitude) };

    if (isNaN(userLocation.latitude) || isNaN(userLocation.longitude)) {
        return res.status(400).json({ error: 'User location is invalid.' });
    }

    try {
        const [schools] = await db.execute('SELECT * FROM schools');
        const sortedSchools = schools.map(school => ({
            ...school,
            distance_meters: geolib.getDistance(userLocation, { latitude: school.latitude, longitude: school.longitude })
        })).sort((a, b) => a.distance_meters - b.distance_meters);

        res.status(200).json(sortedSchools);
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch schools.' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
