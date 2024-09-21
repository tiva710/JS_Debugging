const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Connect to the database
const db = new sqlite3.Database('./tasks.db');

// Create tasks table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    completion_date TEXT NOT NULL
);`);

// Add a new task
app.post('/tasks', (req, res) => {
    const { description, completion_date } = req.body;

    if (!description || !completion_date) {
        return res.status(400).send('Description and completion date are required.');
    }

    // Correct table name
    db.run('INSERT INTO tasks (description, completion_date) VALUES (?, ?)', [description, completion_date], function(err) {
        if (err) {
            return res.status(500).send('Error inserting task');
        }
        res.status(201).send({ id: this.lastID, description, completion_date });
    });
});

// Get all tasks
app.get('/tasks', (req, res) => {
    db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) {
            return res.status(500).send('Error retrieving tasks');
        }
        res.send(rows);
    });
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { description, completion_date } = req.body;

    if (!description || !completion_date) {
        return res.status(400).send('Description and completion date are required.');
    }

    // Corrected the update statement with proper WHERE clause
    db.run('UPDATE tasks SET description = ?, completion_date = ? WHERE id = ?', [description, completion_date, id], function(err) {
        if (err) {
            return res.status(500).send('Error updating task');
        }
        res.send({ id, description, completion_date });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
