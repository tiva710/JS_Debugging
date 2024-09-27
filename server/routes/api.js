//api.js
const express = require('express');
const path = require('path');
const initializeDatabase = require('../dbSetup');
const sqlite3 = require('sqlite3').verbose();
const app = express();

const PORT = 3000;  
const dbPath = path.join(__dirname, '../../db/my-database.db');
const db = new sqlite3.Database(dbPath);

initializeDatabase(dbPath);

app.use(express.json());
app.use(express.static(path.join(__dirname, '../../client'))); 

// Add a new task (CREATE)
app.post('/tasks', (req, res) => {
    console.log(`Req Body: ${JSON.stringify(req.body)}`);
    const { description, completion_date } = req.body;

    if (!description || !completion_date) {
        return res.status(400).send('Description and completion date are required.');
    }

    db.run('INSERT INTO tasks (description, completion_date) VALUES (?, ?)', [description, completion_date], function(err) {
        if (err) {
            return res.status(500).send('Error inserting task');
        }
        res.status(201).send({ id: this.lastID, description, completion_date });
    });
});

// Get all tasks (READ)
app.get('/tasks', (req, res) => { 
    db.all('SELECT * FROM task', [], (err, rows) => {
        if (err) {
            return res.status(500).send('Error retrieving tasks');
        }
        res.send(rows);
    });
});

// Update a task (UPDATE)
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { description, completion_date } = req.body;

    if (!description || !completion_date) {
        return res.status(400).send('Description and completion date are required.');
    }

    db.run('UPDATE tasks SET description = ?, completion_date = ? WHERE id = ?', [description, completion_date, id], function(err) {
        if (err) {
            return res.status(500).send('Error updating task');
        }
        res.send({ id, description, completon_date });
    });
});


//Delete a task DESTORY  
app.delete('/tasks/:id', (req, res) => {
    const {id} = req.params; 

    db.run('DELETE FROM tasks WHERE id = ?' id, function(err){
        if(err){
            return res.status(500).send('Error deleteing task');
        }

        res.send({message: `Tasks with id ${id} deleted`});
    });
});

// Start the server
//HERE - Change PORT to port 
app.listen(port, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});