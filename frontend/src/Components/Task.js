import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useTasksContext } from '../Contexts/TasksProvider';
import { useApi } from '../Contexts/ApiProvider';

// This code defines a Task component that represents a single task within a task list. 
// The component receives a task object as a prop from DisplayTasks.js and carries out 
// a number of operations related to the task.


function Task({ task }) { 

    const [showSubtasks, setShowSubtasks] = useState(false);

    // Get the navigation function for routing
    const navigate = useNavigate();
    
    // Initialize the API client using the custom hook
    const api = useApi();

    // Access the tasks context for parent task details
    const tasks = useTasksContext();

    // Handle the click event for adding a subtask
    const handleAddSubTaskClick = (e) => {
        const parentTaskId = e.target.getAttribute("data-task-id");
        const BoardId = task.board_id;
        navigate(`/add_task?board_id=${BoardId}&parent_task_id=${parentTaskId}`);
        
    };

    // Handle the click event for editing an item
    const editTaskClick = (taskId) => {
        // Redirect to the edit task page with the task ID as a URL parameter
        console.log(taskId)
        navigate(`/edit_task?task_id=${taskId}`);
    };

    // Handle the click event for moving tasks across boards
    const moveTaskClick = () => {
        // Redirect to the edit task page with the task ID as a URL parameter
        navigate(`/change_board?task_id=${task.id}&task_description=${task.task_description}`);
    };
    

    // Mark the task as complete via an API call
    const markTaskAsComplete = async (taskId) => {
        console.log(taskId)
        try {
            const response = await api.put(`/mark_task_complete?task_id=${taskId}`);

            if (response.status === 200) {
                console.log('Task marked as complete:', taskId);
            } else {
                console.error('Failed to mark task as complete');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    // Function to create a tree-like structure of tasks iteratively with corresponding depth
    const createTaskTreeList = (tasks, parentTaskId) => {
        const taskTree = []; // An array to store the tasks in a tree-like structure
        const stack = []; // A stack used for iterative depth-first traversal


        // Push root tasks with depth 0 onto the stack
        stack.push({ task: null, depth: 0 });

        // Continue while there are tasks in the stack
        while (stack.length > 0 ) {
            const { task, depth } = stack.pop();

            if (task) {
                task.depth = depth; // Set the depth of the task
                taskTree.push(task); // Add the task to the tree-like structure
            }

            // Find subtasks of the current task
            const subtasks = tasks.filter(t => t.parent_task_id === (task ? task.id : parentTaskId));

            // Push the subtasks onto the stack with increased depth
            for (const subtask of subtasks) {
                stack.push({ task: subtask, depth: depth + 1 });
            }
        }
        return taskTree; // Return the tasks organized in a tree-like structure
    }

    // Handle the click event for toggling subtasks
    const toggleSubtasks = () => {
        console.log("Toggle subtasks clicked");
        setShowSubtasks(prevState => !prevState);
    };
    // Create a list of incomplete subtasks
    const subtaskList = showSubtasks ? createTaskTreeList(tasks, task.id) : [];
    const subtaskIncompleteList = subtaskList.filter(t =>  t.status !== 'completed');

return (
    <div className="task-list-container">
        <div className="task-column">
            <ul>
                <li className="task-item">
                    <div className="task-description">
                        {task.task_description}
                    </div>

                    {/* Move Task Button: Allows users to move the task */}
                    <button onClick={moveTaskClick} className="move-task-button">
                                <i className="fas fa-arrows-alt"></i> Move
                    </button>

                    {/* Toggle Subtasks Button: Shows or hides subtasks */}
                    <button onClick={toggleSubtasks} className="show-subtask-button">
                        <i className="fas fa-chevron-down"></i> Subtasks
                    </button>

                    {/* Edit Task Button: Opens the task editing interface  */}
                    <button onClick={() => editTaskClick(task.id)} className="edit-task-button">
                        <i className="fas fa-pencil-alt"></i> Edit
                    </button>

                    {/* Mark Task as Complete Button: Marks the task as completed */}
                    <button onClick={() => markTaskAsComplete(task.id)} className="mark-complete-button">
                        <i className="fas fa-check"></i> Completed
                    </button>
                    
                    {subtaskIncompleteList.map(subtask => (
                        <li
                            key={subtask.id}
                            data-depth={subtask.depth}
                            className="subtask-item"
                            style={{ marginLeft: `${subtask.depth * 40}px` }}
                        >
                            {/* Display the subtask description */}
                            {subtask.task_description}

                            {/* Button to add a subtask to this subtask */}
                            <button onClick={handleAddSubTaskClick} data-task-id={subtask.id} className="add-subtask-button">
                                <i className="fas fa-plus"></i> Subtask
                            </button>

                            {/* Button to edit the subtask */}
                            <button onClick={() => editTaskClick(subtask.id)}className="edit-task-button">
                                <i className="fas fa-pencil-alt"></i> Edit
                            </button>

                            {/* Button to mark the subtask as complete */}
                            <button onClick={() => markTaskAsComplete(subtask.id)} className="mark-complete-button">
                                <i className="fas fa-check"></i> Completed
                            </button>
                        </li>
                    ))}

                    {/* Add Subtask Button: Allows users to add subtasks to this task */}
                    <button onClick={handleAddSubTaskClick} data-task-id={task.id} className="add-subtask-button">
                        <i className="fas fa-plus"></i> Subtask
                    </button>
                </li>
            </ul>
        </div>
    </div>

);
}

export default Task;