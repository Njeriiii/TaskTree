import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTasksContext } from '../Contexts/TasksProvider'; // Import the context hook
import { useApi } from '../Contexts/ApiProvider';


const EditTaskForm = () => {
    const location = useLocation();
    const tasks = useTasksContext();
    const navigate = useNavigate();
    const api = useApi(); // Initialize the API client using the custom hook

    
    // Retrieve parent_task_id from URL parameters
    const queryParams = new URLSearchParams(location.search);
    const task_id = parseInt(queryParams.get('task_id'));

    const task = tasks.filter(t => t.id === task_id);
    const [editedTask, setEditedTask] = useState(task[0]); // Initialize with the task or an empty object

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTask({ ...editedTask, [name]: value });
    };

    const onSave = async () => {
        try {
        const response = await api.put(`/update_task/${editedTask.id}`, editedTask);

        if (response.status === 200) {
            console.log('Task updated:', response.data.task_id);

            // Redirect to the task list page or any other desired page after updating
        } else {
            console.error('Failed to update task');
        }
        } catch (error) {
        console.error('Error:', error);
        }
        navigate('/')
    };

    const onCancel = async () => {
        navigate('/')
    };

    return (
        <div>
        <form className="edit-task-form" onSubmit={(e) => e.preventDefault()}>
            <div>
            <label>Task Description:</label>
            <input
                type="text"
                name="task_description"
                value={editedTask.task_description || ''}
                onChange={handleInputChange}
                className="input-field"
            />
            </div>
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

    
    