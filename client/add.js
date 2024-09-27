//add.js

// Add a new task to the list
async function addTask(task) {

    const taskData = {
        description: task.description, 
        completion_date: task.completion_date
    };


    const response = await fetch('/tasks' {
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
    
    const taskDescription = document.getElementById("completionDate").value;
    const completionDate = document.getElementById("addTask").value;

    try{
        if(taskDescription == "" && completionDate == "" && completionDate !== null){
            await addTask({description: taskDescription, completion_date: completionDate});
            taskDescription.value = '';
            completionDate.value = '';
            document.getElementById("taskAdded").innerHTML="Task Added!";
        }else{
            document.getElementById("taskAdded").innerHTML="Both fields are required.";
        }
        
    }catch(err){
        console.log("Error adding a task: ", err);
    } 
});

