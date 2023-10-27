import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTasksContext } from '../Contexts/TasksProvider'; // Import the context hook
import Task from '../Components/Task';

// The DisplayTasks component receives tasks data from the TasksProvider context using the useTasksContext hook. 
// It also retrieves the 'board_id' from the query parameters in the URL, indicating which board's tasks should be displayed.

function DisplayTasks() {
    
    // Retrieve the current location from React Router
    const location = useLocation();
    
    // Access the tasks context for task data
    const tasks = useTasksContext();

    // Get the navigation function for routing
    const navigate = useNavigate();

    // Get the board_id from the query parameter
    const queryParams = new URLSearchParams(location.search);
    const boardId = parseInt(queryParams.get('board_id'));
    const boardTitle = queryParams.get('board_title');

    // Filter tasks based on the board_id
    const filteredTasks = tasks.filter(task => task.board_id === boardId && task.parent_task_id === null && task.status !== 'completed');
    

return (
    <div>
        <p className="boards-title">{boardTitle}</p>
        {/* Add Subtask Button: Allows users to add subtasks to this task */}
        <button
                    onClick={() => navigate(`/add_task?board_id=${boardId}&board_title=${boardTitle}`)}
                    className="add-task-button"
                >
                    + Add Task
        </button>
        {
            filteredTasks.length>0 ?
            (                    
                // If there are tasks to display, 
                // it maps through the filtered tasks and renders the Task component for each task, 
                // passing the task data as a prop.
                filteredTasks.map(task => (
                    <Task key={task.id} task={task} />
                ))
            ) : (
                <div>
                {/* If no tasks are found, it displays a message indicating that there are no tasks. */}
                <p className="not-found-message" >There are no tasks.</p>
                </div>
            )
        }
    </div>
);
}

export default DisplayTasks;