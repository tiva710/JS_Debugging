//JS for add tasks page 

// Initialize an empty to-do list
//let todoList = [];
//let todoList = JSON.parse(localStorage.getItem('todoList') || []);

// Add a new task to the list
async function addTask(task) {

    const taskData = {
        description: task.description, 
        completion_date: task.completion_date
    };

    console.log(`Task data: ${JSON.stringify(taskData)} Descript: ${task.description}`);

    const response = await fetch('/tasks', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(taskData)
    });

    if(!response.ok){
        console.error('Error adding task');
        return; 
    }

    
    const newTask = await response.json();
    console.log(`Task added: ${newTask.description}`);
    return newTask; 
}

document.getElementById("addBtn").addEventListener('click', async function(){
    const taskDescription = document.getElementById("addTask").value;
    const completionDate = document.getElementById("completionDate").value;
    
    await addTask({description: taskDescription, completion_date: completionDate});

    document.getElementById("addTask").value = '';

    //TODO: display that a task was added here 
});

