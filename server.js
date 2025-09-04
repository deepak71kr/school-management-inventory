const express = require('express');
const mysql = require('mysql2/promise');
const geolib = require('geolib');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Create a direct connection to the database
const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

// A new route for the root URL to provide a friendly message.
app.get('/', (req, res) => {
    res.status(200).send('API is running!');
});

// POST /addSchool - Adds a new school
app.post('/addSchool', async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || latitude === undefined || longitude === undefined) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        const [result] = await db.execute(query, [name, address, latitude, longitude]);
        res.status(201).json({ 
            message: 'School added!', 
            schoolId: result.insertId 
        });
    } catch (error) {
        console.error('Failed to add school:', error);
        res.status(500).json({ error: 'Could not add school.' });
    }
});

// GET /listSchools - Lists schools sorted by proximity
app.get('/listSchools', async (req, res) => {
    const { user_latitude, user_longitude } = req.query;

    if (user_latitude === undefined || user_longitude === undefined) {
        return res.status(400).json({ error: 'User location is required.' });
    }

    const userLocation = {
        latitude: parseFloat(user_latitude),
        longitude: parseFloat(user_longitude)
    };

    try {
        const [schools] = await db.execute('SELECT * FROM schools');

        const sortedSchools = schools.map(school => {
            const distance = geolib.getDistance(userLocation, {
                latitude: school.latitude,
                longitude: school.longitude
            });
            return { ...school, distance_meters: distance };
        }).sort((a, b) => a.distance_meters - b.distance_meters);

        res.status(200).json(sortedSchools);
    } catch (error) {
        console.error('Failed to fetch schools:', error);
        res.status(500).json({ error: 'Could not fetch schools.' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
