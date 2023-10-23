// NOT IN USE
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useApi } from '../Contexts/ApiProvider';
import axios from 'axios';

function TaskListPage() {
  const [newTasks, setNewTasks] = useState([]); // State for 'NEW' status tasks
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const location = useLocation();
  const api = useApi(); // Initialize the API client using the custom hook


  // Define the fetchData function
  const fetchData = async () => {
    try {
      const newResponse = await api.get('/get_tasks/new');
      const pendingResponse = await api.get('/get_tasks/pending');
      const completedResponse = await api.get('/get_tasks/completed');

      if (
        newResponse.status === 200 &&
        pendingResponse.status === 200 &&
        completedResponse.status === 200
      ) {
        setNewTasks(newResponse.body.tasks);
        setPendingTasks(pendingResponse.body.tasks);
        setCompletedTasks(completedResponse.body.tasks);
      } else {
        console.error('Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Fetch data only when on the TaskListPage
    if (location.pathname === '/') {
      fetchData();
    }
  }, [location]);

  const handleDelete = async (taskId) => {
    try {
      const response = await axios.delete(`/backend/delete_task/${taskId}`);

      if (response.status === 200) {
        console.log('Task deleted:', taskId);
        // Update the task list by calling fetchData
        fetchData();
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (location.pathname !== '/') {
    return null;
  }

  return (
    <div className="task-list-container">
      <div className="task-column">
        <h2 className="task-title">New Tasks</h2>
        <ul>
          {newTasks.map(task => (
            <li key={task.id} className="task-item">
              {task.task_description}
              <button onClick={() => handleDelete(task.id)} className="delete-button">Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="task-column">
        <h2 className="task-title">Pending Tasks</h2>
        <ul>
          {pendingTasks.map(task => (
            <li key={task.id} className="task-item">
              {task.task_description}
              <button onClick={() => handleDelete(task.id)} className="delete-button">Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="task-column">
        <h2 className="task-title">Completed Tasks</h2>
        <ul>
          {completedTasks.map(task => (
            <li key={task.id} className="task-item">
              {task.task_description}
              <button onClick={() => handleDelete(task.id)} className="delete-button">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskListPage;

