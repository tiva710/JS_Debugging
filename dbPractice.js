const sqlite3 = require('sqlite3').verbose();
const initializeDatabase = require('./dbSetup');

const dbPath = './SQLite_Database';

initializeDatabase(dbPath);
const db = new sqlite3.Database(dbPath);

function runQuery(sql){
    db.run(sql);
}

//Function that fetches a user by id 
function fetchUserById(id) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}


//Task 1: Correctly handle errors and log the correct user 

// Incorrectly handling errors (missing catch for promise rejection)
fetchUserById(-1)
    .then(user => console.log("User:", user))
    .then(() => {
        // Mistakenly assuming the previous promise always resolves correctly
        console.log('Continuing even if previous operation failed');
    }
);


//Task 2: 
async function insertUsers() {
    try {
        await Promise.all([
            runQuery(`INSERT INTO users (name, age, email) VALUES (?, ?, ?)`, ['Dave', 28, 'dave@example.com']),
            runQuery(`INSERT INTO users (name, age, email) VALUES (?, ?, ?)`, ['Eve', 29, 'eve@example.com']),
            runQuery(`INSERT INTO users (name, age, email) VALUES (?, ?, ?)`, ['Frank', 40, 'frank@example.com'])
        ]);
        console.log('Users inserted.'); //but it is null in the database. 
    } catch (err) {
        console.error('Error with inserts:', err.message);
    }
}

insertUsers();