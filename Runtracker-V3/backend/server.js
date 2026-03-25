const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
console.log('Setting up middleware...');
app.use(cors()); // replaces djangos-cors-headers
app.use(express.json()); // Replaces djangos automatic JSON parsing
console.log('Middleware configured');

// DB Connection
console.log('Attempting to connect to database...');
console.log('Database config:', {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
});

console.log('Database pool created');

// Routes

app.get('/test', (req, res) => {
    res.send("ITS ALIVE");
});

// Get all runs, cRud
app.get('/api/runs', async (req, res) => {
    console.log("Retrieving runs from db");
    try {
        const result = await pool.query('SELECT * FROM runs ORDER BY run_date DESC');
        console.log("got it", result.rows.length);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    });

// Create a new run, Crud
app.post('/api/runs', async (req, res) => {
    try {
        const { distance_miles, pace, run_date } = req.body;
        const newRun = await pool.query(
            'INSERT INTO runs (distance_miles,pace, run_date) VALUES ($1, $2, $3) RETURNING*',
            [distance_miles, pace, run_date]
        );
        res.json(newRun.rows[0]);
    } catch (err) {
        console.error("error on your page",err.message);
        res.status(500).send('Server Error');
    }
});

// Deleting a run, cruD
app.delete('/api/runs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM runs WHERE id = $1', [id]);
        res.json({ message: 'Run deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Updating a run crUd
app.put('/api/runs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { distance_miles, pace, run_date } = req.body;
        await pool.query(
            'UPDATE runs SET distance_miles = $1, pace = $2, run_date = $3 WHERE id = $4',
            [distance_miles, pace, run_date, id]
        );
        res.json({message: "Run updated" });
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
    });

// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
    console.log('Routes available:');
    console.log('  GET  /test - Test endpoint');
    console.log('  GET  /api/runs - Retrieve all runs');
    console.log('  POST /api/runs - Create a new run');
    console.log('  PUT  /api/runs/:id - Update a run');
    console.log('  DELETE /api/runs/:id - Delete a run');
});