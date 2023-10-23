import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApi } from '../Contexts/ApiProvider';

function AddTask() {
    const [task, setTask] = useState('');
    const [status, setStatus] = useState('new');
    const [newlyAddedTask, setNewlyAddedTask] = useState(null);
    const navigate = useNavigate();
    const api = useApi(); // Initialize the API client using the custom hook
    const location = useLocation();

    // Retrieve parent_task_id from URL parameters
    const queryParams = new URLSearchParams(location.search);
    const board_id = queryParams.get('board_id'); // Extract board_id
    const parent_task_id = queryParams.get('parent_task_id');



const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await api.post('/add_task', {
            task: task,
            status: status,
            parent_task_id: parent_task_id,
            board_id: board_id,
        });
        
        
    if (response.status === 200) {
        console.log(response);
        if (response.body) {
        console.log('Task added:', response.body);

        // Clear the task input field
        setTask('');
        setStatus('new');
        
        // // Store the newly added parent task
        // setNewlyAddedTask(response.body);
        // setCurrentParentTask(response.body); // Set the current parent task
        console.log('Newly Added Task:', newlyAddedTask.body);
        } else {
        console.error('Response data is empty');
        }
    } else {
        console.error('Failed to add task');
    }
    } catch (error) {
    console.error('Error:', error);
    }
    navigate(-1)
};
const handleComplete = () => {
    // Redirect to TaskListPage after completing the process
    navigate(-1);
  };


    return (
        <div>
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

        {/* Complete button */}
        <button onClick={handleComplete} className="complete-button">
            Complete
        </button>
        </div>
    );
    }

export default AddTask;