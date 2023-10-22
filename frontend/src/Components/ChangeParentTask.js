import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTasksContext } from '../Contexts/TasksProvider'; // Import the context hook
import { useApi } from '../Contexts/ApiProvider';


const ChangeParentTask = () => {
    const location = useLocation();
    const tasks = useTasksContext();
    const navigate = useNavigate();
    const api = useApi(); // Initialize the API client using the custom hook
    const [selectedRootTaskId, setSelectedRootTaskId] = useState('');


    
    // Retrieve parent_task_id from URL parameters
    const queryParams = new URLSearchParams(location.search);
    const subtaskId = parseInt(queryParams.get('task_id'));


    // const subtaskId = tasks.filter(t => t.id === task_id);

    const incompleteParentTaskList = tasks.filter(t => t.parent_task_id === null && t.status !== 'completed')

    const handleRootTaskChange = (e) => {
        setSelectedRootTaskId(e.target.value);
    };


    const handleMoveSubtask = async () => {
        try {
        const response = await api.put(
            `/change_parent_task?subtask_id=${subtaskId}&new_parent_task_id=${selectedRootTaskId}`
        );
    
        if (response.status === 200) {
            console.log('Subtask moved successfully');
            navigate('/')
            // Additional handling, e.g., navigate to another page
        } else {
            console.error('Failed to move subtask');
            console.log()
        }
        } catch (error) {
        console.error('Error:', error);
        }
    };


    const onCancel = async () => {
        navigate('/')
    };

    return (
        <div>
            <select value={selectedRootTaskId} onChange={handleRootTaskChange}>
                <option value="">Select a destination root task</option>
                {incompleteParentTaskList.map((parentTask) => (
                    <option key={parentTask.id} value={parentTask.id}>
                    {parentTask.task_description}
                    </option>
                ))}
            </select>
            <button onClick={handleMoveSubtask}>Move Subtask</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
    };

export default ChangeParentTask;

    
    