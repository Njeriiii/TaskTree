// NOT IN USE

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../Contexts/ApiProvider';

function AddTaskPage() {
  const [task, setTask] = useState('');
  const [status, setStatus] = useState('new');
  const [newlyAddedTask, setNewlyAddedTask] = useState(null);
  const [showSubTaskForm, setShowSubTaskForm] = useState(false);
  const [subTaskDescription, setSubTaskDescription] = useState('');
  const [subTasks, setSubTasks] = useState([]);
  const [currentParentTask, setCurrentParentTask] = useState(null); // Store the current parent task
  const navigate = useNavigate();
  const api = useApi(); // Initialize the API client using the custom hook

    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/add_task', {
        task: task,
        status: status,
      });

      if (response.status === 200) {
        console.log(response);
        if (response.body) {
          console.log('Task added:', response.body.task_id);

          // Clear the task input field
          setTask('');
          setStatus('new');
          
          // Store the newly added parent task
          setNewlyAddedTask(response.body);
          setCurrentParentTask(response.body); // Set the current parent task
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
  };

  const handleAddSubTask = (task) => {
    setShowSubTaskForm(true);
    setCurrentParentTask(task);
  };

  const handleCancelSubTask = () => {
    setShowSubTaskForm(false);
    setSubTaskDescription('');
  };

  const handleAddSubTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentParentTask) {
        console.log("current:", currentParentTask);
        // Send the sub-task data to the backend and associate it with the parent task
        const response = await api.post('/add_sub_task', {
          task: subTaskDescription,
          status: status,
          parent_task_id: currentParentTask.task_id,
        });

        if (response.status === 200) {
          if (response.body) {
            // Add the newly created sub-task to the subTasks state
            setSubTasks([...subTasks, response.body]);
            console.log('Sub-Task added:', response.body);
            setShowSubTaskForm(false); // Hide the sub-task form
            setSubTaskDescription(''); // Clear the sub-task input field
          } else {
            console.error('Response data is empty');
          }
        } else {
          console.error('Failed to add sub-task');
        }
      } else {
        console.error('Current parent task is not set.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleComplete = () => {
    // Redirect to TaskListPage after completing the process
    navigate('/');
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

      {/* Display the newly added parent task */}
      {currentParentTask && (
        <div className="newly-added-task">
          <h2>Newly Added Task:</h2>
          <ul>
            <li key={currentParentTask.task_id}>
              {currentParentTask.task_description}
              <button
                className="add-sub-task-button"
                onClick={() => handleAddSubTask(currentParentTask)}
              >
                Add Sub-Task
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Display sub-tasks */}
      {subTasks.length > 0 && (
        <div className="task-list">
          <h2>Sub-Tasks:</h2>
          <ul>
            {subTasks.map((subTask) => (
              <li key={subTask.id}>
                {subTask.task_description}
                <button
                  className="add-sub-task-button"
                  onClick={() => handleAddSubTask(subTask)}
                >
                  Add Sub-Task
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sub-task form */}
      {showSubTaskForm && (
        <form className="add-sub-task-form" onSubmit={handleAddSubTaskSubmit}>
          {/* Display the description of the selected parent task as a heading */}
          {currentParentTask && (
            <h1>{currentParentTask.task_description}</h1>
          )}
          <textarea
            type="text"
            placeholder="Sub-Task description"
            value={subTaskDescription}
            onChange={(e) => setSubTaskDescription(e.target.value)}
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
          <button type="button" onClick={handleCancelSubTask}>
            Cancel
          </button>
          <button type="submit">Add Sub-Task</button>
        </form>
      )}

      {/* Complete button */}
      <button onClick={handleComplete} className="complete-button">
        Complete
      </button>
    </div>
  );
}

export default AddTaskPage;
