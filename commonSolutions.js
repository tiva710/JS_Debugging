//Task 1: log the values in the array 
const arr = [10, 20, 30];

for(const index of arr){
    console.log("arr values: " + index);  
}


//Task 2: log the object properties 
const obj = {name: "Alice", age: 30, city: "New York"};


console.log("\nObject values: ");
for(const value in obj){
    console.log(obj[value]);  
}

//Task 3: 