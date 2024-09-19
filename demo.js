"use strict";
//Debugger keyword practice 
//Task: Find and fix all bugs in the following program using the `debugger` statement

// Function to calculate the sum of an array of numbers
function calculateSum(numbers) {
    console.log("Calculating sum for:", numbers);
    
    debugger; // Step 1: Pause here to inspect the array and sum initialization

    let sum = 0;
    for (let i = 0; i <= numbers.length; i++) {  // Bug: Should be i < numbers.length
        sum += numbers[i];  // Potentially adding 'undefined' 
    }
    return sum;  
}

// Function to validate user input with complex rules
function validateInput(input) {
    console.log("Validating input:", input);
    
    debugger; // Step 2: Pause here to inspect input and validation logic

    if (typeof input !== 'object' || input === null) {
        console.error("Invalid input: must be a non-null object.");
        return false;
    }
    
    if (!input.hasOwnProperty('name') || typeof input.name !== 'string' || input.name.trim().length < 5) {
        console.error("Invalid input: 'name' must be a string with at least 5 characters.");
        return false;
    }
    
    if (!input.hasOwnProperty('age') || typeof input.age !== 'number' || input.age < 18 || input.age > 120) {
        console.error("Invalid input: 'age' must be a number between 18 and 120.");
        return false;
    }
    
    return true;
}

// Function to process a list of items
function processList(items) {
    console.log("Processing items:", items);
    
    debugger; // Step 3: Pause here to inspect the list and processing logic

    let results = [];
    for (let i = 0; i < items.length; i++) {
        if (typeof items[i] !== 'string') {
            console.error("Invalid item type:", items[i]);
            continue; // Skip invalid items
        }
        results.push(items[i].toUpperCase());  // Transform item to uppercase
    }
    
    return results;
}

// Function to simulate an API call and handle the response
// function fetchData(url) {
//     console.log("Fetching data from:", url);
    
//     debugger; // Step 4: Pause here to inspect URL handling and mock data

//     const responses = {
//         "https://api.example.com/data": { success: true, data: { id: 1, name: "Valid Data" } },
//         "https://api.example.com/empty": { success: true, data: null },
//         "https://api.example.com/error": { success: false, message: "Error occurred" }
//     };

//     if (!responses[url]) {
//         console.error("Fetch failed: Incorrect URL.");
//         return null;
//     }
    
//     const response = responses[url];
//     if (!response.success) {
//         console.error("Fetch failed:", response.message);
//         return null;
//     }
    
//     return response.data;  // Simulate a successful fetch
// }

// Main execution function
function runDebuggingExample() {
    console.log("Starting debugging example...");

    // Test sum calculation
    const sumResult = calculateSum([10, 20, 30, 40]);  // Check if sum calculation is correct
    console.log("Sum result:", sumResult);

    // Test input validation
    const validUser = { name: "Alice", age: 30 };
    const invalidUser = { name: "Bob", age: 15 };  // Invalid age
    const isValidInput1 = validateInput(validUser);
    const isValidInput2 = validateInput(invalidUser);  // Should trigger validation error
    console.log("Is valid input (validUser):", isValidInput1);
    console.log("Is valid input (invalidUser):", isValidInput2);

    // Test list processing
    const items = ["apple", 123, "banana"];  // Mixed types
    const processedItems = processList(items);  // Check processing logic and error handling
    console.log("Processed items:", processedItems);

    // Test fetch data with various URLs
    // const data1 = fetchData("https://api.example.com/data");  // Valid URL
    // const data2 = fetchData("https://api.example.com/error");  // URL with error
    // const data3 = fetchData("https://unknown.api.com");  // Invalid URL
    // console.log("Fetched data (valid URL):", data1);
    // console.log("Fetched data (error URL):", data2);
    // console.log("Fetched data (unknown URL):", data3);
}

runDebuggingExample(); 
