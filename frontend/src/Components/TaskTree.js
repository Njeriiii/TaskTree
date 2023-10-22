import React, { useState } from 'react';
import { useTasksContext } from '../Contexts/TasksProvider';
import Task from './Task';
import CreateTaskTreeList from './CreateTaskTreeList'; // Import the function to create the task tree

function TaskTree() {
    const tasks = useTasksContext(); // Access the tasks from the context

    // Use the CreateTaskTreeList function to create the hierarchical structure
    const taskTree = CreateTaskTreeList(tasks, null);

    const [taskTreeRoot, setTaskTreeRoot] = useState(null);

    // Function to handle the click on "show subtasks" button in a task
    const handleShowSubtasksClick = (taskId) => {
        // console.log('Clicked task:', taskId);
        setTaskTreeRoot(taskId); // Set the clicked task as the root of the task tree
        // console.log('Task tree root:', taskTreeRoot);
    };

    

    // Define a function to render tasks and their subtasks
    const renderTask = (key, task ) => (
        <div key={task.id}>
            <Task key = {key} task={task} />  {/* Render the task using the Task component */}   {/* If there are subtasks, render them */} {/* Recursively render subtasks */}
            {task.id === taskTreeRoot && task.subtasks.length > 0 && (  
                <div style={{ marginLeft: '20px' }}> 
                    {task.subtasks.map((subtask) => renderTask(subtask)) }
                </div>
                
            )}
        </div>
    );

    return (
        <div>
            <h2>Tasks</h2>
            {taskTree.map((task) => renderTask(task))} {/* Render the tasks and their subtasks */}
        </div>
    );
}

export default TaskTree;
