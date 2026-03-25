const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import the Model (The 'Contract' for our data)
const Run = require('./models/Run');

const app = express();
const PORT = process.env.PORT || 5002;

// 1. Middleware
app.use(cors());
app.use(express.json());

// 2. The Database Connection (The 'Tracer' Base)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/runtracker_v4';

mongoose.connect(MONGO_URI)
    .then(() => console.log("🍃 MongoDB Connected: The Base is Secure"))
    .catch(err => console.error("❌ Mongo Connection Error:", err));

// 3. The Tracer Bullet Route (GET)
app.get('/api/runs', async (req, res) => {
    console.log("🎯 Tracer Bullet: Request hit the API");
    try {
        // Pragmatic Tip: We use the Model to talk to the DB (Decoupling)
        const runs = await Run.find();
        res.json(runs);
    } catch (err) {
        res.status(500).json({ error: "Tracer failed at DB layer" });
    }
});
// 1. GET ALL RUNS (cRud)
app.get('/api/runs', async (req, res) => {
    try {
        // Pragmatic Tip: Run.find() is decoupled from the SQL syntax
        const runs = await Run.find().sort({ run_date: -1 });
        res.json(runs);
    } catch (err) {
        console.error("❌ Fetch Error:", err.message);
        res.status(500).send("Server Error");
    }
});

// 2. CREATE A RUN (Crud)
app.post('/api/runs', async (req, res) => {
    try {
        const { distance_miles, pace, run_date } = req.body;

        // Create a new instance of our 'Run' Model
        const newRun = new Run({
            distance_miles,
            pace,
            run_date
        });

        const savedRun = await newRun.save();
        res.json(savedRun);
    } catch (err) {
        console.error("❌ Post Error:", err.message);
        res.status(400).json({ error: "Validation Failed" });
    }
});

// 3. DELETE A RUN (cruD)
app.get('/api/runs/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Pragmatic Tip: findByIdAndDelete is a high-level abstraction
        await Run.findByIdAndDelete(id);
        res.json({ message: "Run deleted from Mongo" });
    } catch (err) {
        res.status(500).send("Delete failed");
    }
});

// 4. UPDATE A RUN (crUd)
app.put('/api/runs/:id', async (req, res) => {
    try {
        // new: true returns the modified document rather than the original
        const updatedRun = await Run.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedRun);
    } catch (err) {
        res.status(500).send("Update failed");
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Tracer active on http://localhost:${PORT}`);
});