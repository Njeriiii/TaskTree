import { createContext, useContext } from 'react';
import React, { useState, useEffect } from 'react';
import { useApi } from '../Contexts/ApiProvider'; // Assuming you have your API context set up

const TasksContext = createContext();

export function useTasksContext() {
    return useContext(TasksContext);
}

export function TasksProvider({ children }) {
    const api = useApi(); // Initialize the API client using the custom hook
    const [tasks, setTasks] = useState([]);

    const fetchData = async () => {
        try {

        const response = await api.get('/get_tasks');

        if (response.status === 200) {
            setTasks(response.body.tasks);
        } else {
            console.error('Failed to fetch tasks');
        }
        } catch (error) {
        console.error('Error:', error);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchData(); 
    }, []);

    return (
        <TasksContext.Provider value={tasks}>
        {children}
        </TasksContext.Provider>
    );
    }
