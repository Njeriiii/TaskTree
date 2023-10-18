import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useApi } from '../Contexts/ApiProvider';
import Task from './Task';


function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [filterParentTaskId, setFilterParentTaskId] = useState(null); // Add state to store the filter
    const api = useApi(); // Initialize the API client using the custom hook
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const parentTaskId = queryParams.get('parent_task_id');
    // const [filteredTasks, setFilteredTasks] = useState([]); // Add state for filtered tasks


    // TODO: add a side effect function to request tasks here
    // Define the fetchData function
    const fetchData = async () => {
        try {

            // Modify the URL based on whether parentTaskId is specified
            let url = '/get_tasks';
            if (parentTaskId) {
                url += `?parent_task_id=${parentTaskId}`;
            }
        
            const response = await api.get(url);

            if (
                response.status === 200
            ) {
                setTasks(response.body.tasks);
                console.log(tasks);
                
            } else {
                console.error('Failed to fetch tasks');
            }
            } catch (error) {
            console.error('Error:', error);
            }
    };

    useEffect(() => {
        // Fetch data only when on the TaskListPage
        fetchData() }, [parentTaskId]); // Fetch data when parentTaskId changes

    // useEffect(() => {
    //     // Filter the tasks based on parentTaskId and set them to filteredTasks
    //     if (parentTaskId) {
    //         const filtered = tasks.filter(task => task.parent_task_id === parentTaskId);
    //         setFilteredTasks(filtered);
    //     } else {
    //         setFilteredTasks(tasks);
    //     }
    // }, [parentTaskId, tasks]);

    

    // Filter tasks based on parent_task_id
    const filteredTasks = tasks.filter(task => {
        if (filterParentTaskId === null) {
        // When the filter is not set, display only parent tasks
        return task.parent_task_id === null;
        } else {
        // When the filter is set, display tasks with a specific parent_task_id
        return task.parent_task_id === filterParentTaskId;
        }
    });

    // Filter tasks where parent_task_id is null -- Default is to only display Parent tasks in main webview
    const parentTasks = tasks.filter(task => task.parent_task_id === null);

    return (
        <>  
            <h2>Tasks</h2>
            {filteredTasks === null ?
            <p>Could not retrieve tasks.</p>
            :
                <>
                    {filteredTasks.length === 0 ?
                    <p>There are no tasks.</p>
                    :
                    filteredTasks.map(task => <Task key={task.id} task={task} setFilterParentTaskId={setFilterParentTaskId} />)
                    }
                </>
            }
        </>

        
    );
}
export default Tasks;


// setFilterParentTaskId={setFilterParentTaskId}