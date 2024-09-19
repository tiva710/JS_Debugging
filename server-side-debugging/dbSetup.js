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
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER NOT NULL,
            email TEXT NOT NULL
        )`);

        // Insert some sample data
        const insertData = db.prepare(`INSERT INTO users (name, age, email) VALUES (?, ?, ?)`);
        insertData.run('Alice', 30, 'alice@example.com');
        insertData.run('Bob', 25, 'bob@example.com');
        insertData.run('Charlie', 35, 'charlie@example.com');
        insertData.finalize();
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