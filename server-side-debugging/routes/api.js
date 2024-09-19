const express = require('express');
const bodyParser = require('body-parser');
const initializeDatabase = require('../dbSetup.js');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000; 
const dbPath = './database.sqlite';

initializeDatabase(dbPath);

app.use(bodyParser.json());

const dbs = new sqlite3.Database(dbPath);

app.get('/api/getUser', (req, res) => {
    const id = req.query.id;

    dbs.get(`SELECT * FROM user WHERE id = ?`, [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: 'Database error occurred' });
        } else if (!row) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(200).json(row);
        }
    });
});

app.post('/api/users', (req, res) => {
    //debugger;  //Execution will pause 
    const {name, age, email} = req.body; 

    if(!name || !age || !email){
        return res.status(400).json({ error: 'Name, email, and age are required' });
    }

    dbs.run(`INSERT INTO users (name, age, email) VALUES (?, ?, ?)`, [name, age, email], function(err){
        if(err){
            res.status(500).json({error: 'Error inserting user into the database'});
        }else{
            res.status(201).json({id: this.lastID});
        }
    });
});

//Start the server 
app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});