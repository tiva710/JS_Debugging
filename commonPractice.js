//Task 1: log the values in the array 
const arr = [10, 20, 30];

for(const index in arr){
    console.log("arr values: " + index);  
}


//Task 2: log the object properties 
const obj = {name: "Alice", age: 30, city: "New York"};

console.log("\nObject values: ");
for(const value of obj){
    console.log(value);
}

//Task 3: 
function greet(){
    console.log("Hello");
}

// let result = 