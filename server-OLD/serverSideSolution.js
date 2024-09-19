"use strict";

const fs = require('fs').promises;

async function createAndWriteFile() {
    try {
        // Step 1: Create or clear the file
        await fs.writeFile('server/file.txt', 'How to shuffle a deck of cards\n');
        console.log('File created.');

        // Step 2: append lines to the file
        await fs.appendFile('server/file.txt', 'Step 1: Acquire deck of cards\nStep 2: Open cards\n');
        console.log('Multiple lines appended to file.');

        // Step 3: append more lines to the file
        await fs.appendFile('server/file.txt', 'Step 3: Throw cards in the air\nStep 4: Pick up all cards\n');
        console.log('More lines appended to file.');

        // Step 4: Append final content 
        await fs.appendFile('server/file.txt', 'Final Step: Enjoy your shuffled cards\n');
        console.log('Final content appended to file.');

        console.log('File operations complete and in correct order.');
    } catch (err) {
        console.error('Error:', err);
    }
}

createAndWriteFile();