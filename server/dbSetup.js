const sqlite3 = require('sqlite3').verbose();

// Function to initialize the database
function initializeDatabase(dbPath) {
    const db = new sqlite3.Database(dbPath, (err) => {
        if(err){
            console.error("Database connection error");
        }else{
            console.log("Connected to SQLite Database.");
        }
    });

    db.serialize(() => {
        // Create the users table if it doesn't exist
        
        db.run(`CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT NOT NULL,
            completion_date TEXT NOT NULL
        )`);

    });

    db.close((err) => {
        if(err){
            console.error("Error closing the database");
        }else{
            console.log("Database connection closed.");
        }
    });
}


module.exports = initializeDatabase;