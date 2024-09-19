const express = require('express');
const bodyParser = require('body-parser');
const initializeDatabase = require('../dbSetup');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;
const dbPath = './database.sqlite';

initializeDatabase(dbPath);  // Initialize the database

app.use(bodyParser.json());

// Correct database object
const db = new sqlite3.Database(dbPath);

// Correct route
app.get('/api/users', (req, res) => {
    const id = req.query.id;

    // Correct table name (users) and error handling
    db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: 'Database error occurred' });
        } else if (!row) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(200).json(row);
        }
    });
});

// Proper input validation
app.post('/api/users', (req, res) => {
    const { name, age, email } = req.body;

    if (!name || !age || !email || isNaN(age)) {
        return res.status(400).json({ error: 'Name, valid age, and email are required' });
    }

    db.run(`INSERT INTO users (name, age, email) VALUES (?, ?, ?)`, [name, age, email], function(err) {
        if (err) {
            res.status(500).json({ error: 'Error inserting user into the database' });
        } else {
            res.status(201).json({ id: this.lastID });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
