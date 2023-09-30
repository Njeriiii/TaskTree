import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function TaskListPage() {
  const [newTasks, setNewTasks] = useState([]); // State for 'NEW' status tasks
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const location = useLocation();

  // Define the fetchData function
  const fetchData = async () => {
    try {
      const newResponse = await axios.get('/backend/get_tasks/new'); // Fetch 'NEW' status tasks
      const pendingResponse = await axios.get('/backend/get_tasks/pending');
      const completedResponse = await axios.get('/backend/get_tasks/completed');

      if (
        newResponse.status === 200 &&
        pendingResponse.status === 200 &&
        completedResponse.status === 200
      ) {
        setNewTasks(newResponse.data.tasks);
        setPendingTasks(pendingResponse.data.tasks);
        setCompletedTasks(completedResponse.data.tasks);
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

