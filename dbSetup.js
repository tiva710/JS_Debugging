const sqlite3 = require('sqlite3').verbose();

// Function to initialize the database
function initializeDatabase(dbPath) {
    const db = new sqlite3.Database(dbPath);

    db.serialize(() => {
        // Create the users table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            age INTEGER,
            email TEXT
        )`);

        // Insert some sample data
        db.run(`INSERT INTO users (name, age, email) VALUES (?, ?, ?)`, ['Alice', 30, 'alice@example.com']);
        db.run(`INSERT INTO users (name, age, email) VALUES (?, ?, ?)`, ['Bob', 25, 'bob@example.com']);
        db.run(`INSERT INTO users (name, age, email) VALUES (?, ?, ?)`, ['Charlie', 35, 'charlie@example.com']);
    });

    db.close();
}

module.exports = initializeDatabase;