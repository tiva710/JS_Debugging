const sqlite3 = require('sqlite3').verbose();


function initializeDatabase(dbPath) {
    const db = new sqlite3.Database(dbPath, (err) => {
        if(err){
            console.error("Database connection error");
        }else{
            console.log("Connected to SQLite Database.");
        }
    });

    db.serialize(() => {

        db.run(`CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT NOT NULL,
            completion_date TEXT NOT NULL
        )`);

    });

    db.close((err) => {
        if(err){
            console.error("Error closing the database");
        }
    });
}


module.exports = initializeDatabase;