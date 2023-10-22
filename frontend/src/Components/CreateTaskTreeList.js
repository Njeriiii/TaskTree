import React, { useState, useEffect } from 'react';
import { useApi } from '../Contexts/ApiProvider';
import Task from './Task';
import { Tasks } from './Tasks';
import { useTasksContext } from '../Contexts/TasksProvider'; // Import the context hook


function CreateTaskTreeList(tasks, parentTaskId = null, api) {
    // Initialize the taskTree array to build the hierarchical structure
    const taskTree = [];

    // Filter subtasks for the given parentTaskId
    const subtasks = tasks.filter((task) => task.parent_task_id === parentTaskId);

    // Loop through the subtasks and create a tree structure
    for (const task of subtasks) {
        // Recursively create a subtask tree
        const subtaskTree = CreateTaskTreeList(tasks, task.id, api);   // fix this for parent_id and current_task_id
        
        // If there are subtasks, add them to the current task
        if (subtaskTree.length > 0) {
            task.subtasks = subtaskTree;
        }
        
        // Add the task to the taskTree
        taskTree.push(task);
    }

    return taskTree;
}

function TaskTreeList () {
    // const [tasks, setTasks] = useState([]);
    const tasks = useTasksContext(); // Access the tasks from the context


    // Use the createTaskTree function to organize the tasks hierarchically
    const taskTree = CreateTaskTreeList(tasks, null);

    return (
        <>
            <h2>Tasks</h2>
            {/* Render your tasks using the taskTree */}
            {taskTree.map((task) => (
                <Task id={task} task={task} />
            ))}
        </>
    );
}

export default TaskTreeList;






