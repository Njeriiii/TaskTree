import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApi } from '../Contexts/ApiProvider';
import { useTasksContext } from '../Contexts/TasksProvider';

// This component represents a form for adding new tasks. 
// It uses React state to manage form input fields (task description and status).
// The component uses the useApi custom hook to access the API client 
// and make a POST request to add a new task when the form is submitted. 
// The form content depends on whether it's adding a top-level task or a subtask to a parent task.

function AddTask() {
    const [task, setTask] = useState(''); // State to manage the task description
    const [status, setStatus] = useState('new'); // State to manage the task status


    // Get the navigation function for routing
    const navigate = useNavigate();
    
    // Initialize the API client using the custom hook
    const api = useApi();
    
    // Get the current location, which contains URL parameters
    const location = useLocation();
    
    // Access the tasks context for parent task details
    const tasks = useTasksContext();

    // Retrieve from URL parameters
    const queryParams = new URLSearchParams(location.search);
    const board_id = queryParams.get('board_id'); // Extract board_id
    const board_title = queryParams.get('board_title'); // Extract board_title
    const parent_task_id = parseInt(queryParams.get('parent_task_id')); // Extract parent_task_id


// Function to handle form submission
const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        // Make a POST request to add a new task
        const response = await api.post('/add_task', {
            task: task,
            status: status,
            parent_task_id: parent_task_id,
            board_id: board_id,
        });
        
        
    if (response.status === 200) {
        if (response.body) {
        console.log('Task added:', response.body);

        // Clear the task input field
        setTask('');
        setStatus('new');
        
        } else {
        console.error('Response data is empty');
        }
    } else {
        console.error('Failed to add task');
    }
    } catch (error) {
    console.error('Error:', error);
    }
    // Redirect to previous page after completing the process
    navigate(-1)
};

// Function to handle cancellation
const handleCancel = () => {
    // Redirect to previous page
    navigate(-1);
};

// Find the parent task if it exists -- means item being added is a subtask
const parent_task = (tasks.filter(task => task.id === parent_task_id))[0];

return (
    <div className="add-task-container">
        {
        parent_task_id ? (
            // If adding a subtask, display a message with the parent task's description
            <p className="add-task-container-text" > Add a subtask to {parent_task.task_description} </p>
        ):(
            // If adding a top-level task, display a message with the board title
        <p className="add-task-container-text" > Add a Task to {board_title} </p>
        )}
        <form className="add-task-form" onSubmit={handleSubmit}>
            <textarea
            type="text"
            placeholder="Task description"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="input-field"
            />
            <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="select-list"
            >
            <option value="new">New</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            </select>
            <button type="submit" className="add-button">
            Add Task
            </button>
        </form>

        {/* Button to cancel the task addition */}
        <button onClick={handleCancel} className="cancel-button">
            Cancel
        </button>
    </div>
);
}

export default AddTask;