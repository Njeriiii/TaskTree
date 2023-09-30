import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

function CreateListPage({ parentTaskId, onTaskAdded }) {
  const [task, setTask] = useState('');
  const [status, setStatus] = useState('new'); // Set the default status to 'New'

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/backend/add_task', {
        task: task,
        status: status,
        parent_id: parentTaskId, // Specify the parent task ID
      });

      if (response.status === 200) {
        // Check if there is data in the response
        if (response.data) {
          console.log('Task added:', response.data);
          setTask(''); // Clear the task input field
          onTaskAdded(response.data); // Notify the parent component about the new task
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task description"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="new">New</option>
        <option value="pending">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default CreateListPage;
