"use strict";

//Tasks: 
//  1. Refactor code using async & await for code readability, best practices, 
//     and future error prevention
//  2. Ensure all lines are written to file in the corrct order 
//  3. Confirm the steps are written only once after multiple runs 

const fs = require('fs');
//Hint: const fs = require('fs').promises 
//      to use async/await 

function createAndWriteFile() {
    // Step 1: Create or clear the file
    fs.writeFile('server/file.txt', 'How to shuffle a deck of cards\n', (err) => {
        if (err) {
            console.error('Error creating file:', err);
            return;
        }
        console.log('File created.');

        
        setTimeout(() => {
            // Step 2: Write multiple lines to the file
            fs.appendFile('server/file.txt', 'Step 1: Acquire deck of cards\nStep 2: Open cards\n', (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                    return;
                }
                console.log('Lines written to file.');           
                
            })
        }, 500); 


        setTimeout(() => {
            // Step 3: Append more lines to the file
            fs.writeFile('server/file.txt', 'Step 3: Throw cards in the air\nStep 4: Pick up all cards\n', (err) => {
                if (err) {
                    console.error('Error appending to file:', err);
                    return;
                }
                console.log('Lines appended to file.');

            });            
        }, 500); 


        setTimeout(() => {
            // Step 4: Write additional content
            fs.writeFile('server/file.txt', 'Final Step: Enjoy your shuffled cards\n', (err) => {
                console.log('Final content written to file.');
            });
        }, 500);
    });
}

createAndWriteFile();
