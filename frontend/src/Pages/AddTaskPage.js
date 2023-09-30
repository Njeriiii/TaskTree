import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function AddTaskPage() {
  const [task, setTask] = useState('');
  const [status, setStatus] = useState('new'); // Set the default status to 'New'
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/backend/add_task', {
        task: task,
        status: status,
      });

      if (response.status === 200) {
        // Check if there is data in the response
        if (response.data) {
          console.log('Task added:', response.data);
          // Redirect to TaskListPage after adding a task
          navigate('/'); // Replace '/' with the appropriate path to TaskListPage
        } else {
          console.error('Response data is empty');
        }
      } else {
        // Handle errors here
        console.error('Failed to add task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
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
        <option value="new">New</option> {/* Add "New" status option */}
        <option value="pending">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit" className="add-button">
        Add Task
      </button>
    </form>
  );
}

export default AddTaskPage;
