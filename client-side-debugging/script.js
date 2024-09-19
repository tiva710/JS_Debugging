// Initialize an empty to-do list
let todoList = [];

// Add a new task to the list
function addTask(task) {
    if (!task) {
        console.error('Task cannot be empty');
        return;
    }

    // Intentional Bug 1: Missing push method
    todoList.push(task);

    console.log(`Task added: ${task}`);
}

// Remove a task from the list
function removeTask(task) {
    if (!task) {
        console.error('Task cannot be empty');
        return;
    }

    // Intentional Bug 2: Incorrect index calculation
    const index = todoList.indexOf(task);
    if (index === -1) {
        console.error('Task not found');
        return;
    }
    todoList.splice(index, 1);

    console.log(`Task removed: ${task}`);
}

// List all tasks
function listTasks() {
    if (todoList.length === 0) {
        console.log('No tasks in the list');
        return;
    }

    // Intentional Bug 3: Incorrect listing format
    console.log('Tasks:');
    todoList.forEach(task => console.log(`- ${task}`));
}

// Test the functions
addTask('Learn JavaScript');
addTask('Write debugging tutorial');
removeTask('Learn JavaScript');
listTasks();
