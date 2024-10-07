//edit.js
'use strict';
// List all tasks
async function listTasks() {
    const response = await fetch('/tasks');

    if(!response.ok){
        console.error('Error fetching tasks');
        return; 
    }

    const tasks = await response.json();
    
    tasks.forEach(task => {
        //debugger; 
        document.getElementById("taskList").innerHTML += `
        <div class="taskItem" >
            <p>${task.description} <br> 
            Due: ${task.completion_date}</p> 
            <br> 
            <button onclick="deleteTask(${task.id})"> Completed </button> 
            <button onclick="editTask(${task.id}, ${task.description}', '${task.completion_date}')">Edit</button>
        </div>
        `;
    });
}



const modal = document.getElementById("editModal");

// Close modal when the 'X' is clicked
document.querySelector('.close').onclick = function () {
    modal.style.display = "none";
};

// // Close modal if user clicks outside the modal content
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
//Load tasks when page is loaded 
document.addEventListener('DOMContentLoaded', listTasks);