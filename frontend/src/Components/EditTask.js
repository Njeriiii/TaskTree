import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTasksContext } from '../Contexts/TasksProvider'; // Import the context hook
import { useApi } from '../Contexts/ApiProvider';

//The EditTaskForm component is responsible for rendering and managing a form to edit a specific task. Here's what it does:


const EditTaskForm = () => {
    // Retrieve the current location from React Router
    const location = useLocation();
    
    // Access the tasks context for task data
    const tasks = useTasksContext();
    
    // Initialize the router navigation function
    const navigate = useNavigate();
    
    // Initialize the API client using a custom hook
    const api = useApi();

    
    // Retrieve 'task_id' from URL parameters
    const queryParams = new URLSearchParams(location.search);
    const task_id = parseInt(queryParams.get('task_id'));

    // Find the task with the matching 'task_id' in the tasks data
    const task = tasks.filter(t => t.id === task_id);

    // Initialize a state variable to hold the edited task
    const [editedTask, setEditedTask] = useState(task[0]);

    // Handle input changes in the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTask({ ...editedTask, [name]: value });
    };

    // Handle the 'Save' action
    const onSave = async () => {
        try {
        // Make an API request to update the task
        const response = await api.put(`/update_task/${editedTask.id}`, editedTask);

        if (response.status === 200) {
            console.log('Task updated:', response.data.task_id);

        } else {
            console.error('Failed to update task');
        }
        } catch (error) {
        console.error('Error:', error);
        }
        // Navigate back to previous page
        navigate(-1)
    };

    // Handle the 'Cancel' action
    const onCancel = async () => {
        // Navigate back to previous page
        navigate(-1)
    };

    return (
        <div className="edit-task-container">
            <form className="edit-task-form" onSubmit={(e) => e.preventDefault()}>
                
                {/* Task Description Input */}
                <div className="form-group">
                    <label className="form-label">Task Description:</label>
                    <input
                        type="text"
                        name="task_description"
                        value={editedTask.task_description || ''}
                        onChange={handleInputChange}
                        className="input-field"
                    />
                </div>

                {/* Task Status Selection */}
                <select
                    name="status"
                    value={editedTask.status}
                    onChange={handleInputChange}
                    className="select-list"
                >
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>

                {/* Save Button */}
                <button onClick={onSave} className="update-button">
                    Update Task
                </button>
            </form>

            {/* Cancel button */}
            <button onClick={onCancel} className="cancel-button">
                Cancel
            </button>
        </div>
    );
    };

export default EditTaskForm;