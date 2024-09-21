//edit.js

// List all tasks
async function listTasks() {
    const response = await fetch('/tasks');

    if(!response.ok){
        console.error('Error fetching tasks');
        return; 
    }

    const tasks = await response.json();

    const taskList = document.querySelector("#taskList");
    taskList.innerHTML = ``;//Clear existing tasks 
    
    tasks.forEach(task => {
        document.getElementById("taskList").innerHTML += `
        <div class="taskItem" >
            <p>${task.description} <br> 
            Due: ${task.completion_date}</p> 
            <br> 
            <button onclick="deleteTask(${task.id})"> Delete </button> 
            <button onclick="editTask(${task.id}, '${task.description}', '${task.completion_date}')">Edit</button>
        </div>
        `;
    });
}


// Remove a task from the list
async function deleteTask(id) {
    const response = await fetch(`/tasks/${id}`, {method: 'DELETE'});

    if (!response.ok) {
        console.error('Error deleting task');
        return;
    }

   console.log(`Task ${id} deleted`);
   listTasks();
}

//POP UP TO EDIT TASK
// document.getElementById("editBtn").addEventListener('click', async function(){
//     const taskDescription = document.getElementById("editTask").value;
//     const completionDate = document.getElementById("completionDate").value;
    
//     await editTask({description: taskDescription, completion_date: completionDate});

//     document.getElementById("addTask").value = '';

//     //TODO: display that a task was added here 
// });


async function editTask(id, description, completion_date){
    const newDescription = prompt("Edit task description: ", description);
    const newCompletionDate = prompt("Edit completion date: ", completion_date);

    if(!newDescription || !newCompletionDate) return; 

    const response = await fetch(`/tasks/${id}`, {
        method: 'PUT', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({description: newDescription, completion_date: newCompletionDate})
    });

    if(!response.ok){
        console.error('Error updating task');
        return; 
    }

    console.log(`Task ${id} updated`);
    listTasks();
}





//Load tasks when page is loaded 
document.addEventListener('DOMContentLoaded', listTasks);