import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddTaskPage() {
  const [task, setTask] = useState('');
  const [status, setStatus] = useState('new');
  const [newlyAddedTask, setNewlyAddedTask] = useState(null); // Store the newly added parent task
  const [showSubTaskForm, setShowSubTaskForm] = useState(false);
  const [subTaskDescription, setSubTaskDescription] = useState('');
  const [subTasks, setSubTasks] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/backend/add_task', {
        task: task,
        status: status,
      });

      if (response.status === 200) {
        if (response.data) {
          console.log('Task added:', response.data.task_id);
          // Clear the task input field
          setTask('');
          setStatus('new');
          // Store the newly added parent task
          setNewlyAddedTask(response.data);
          console.log('Newly Added Task:', newlyAddedTask.data);
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

  const handleAddSubTask = () => {
    setShowSubTaskForm(true);
  };

  const handleCancelSubTask = () => {
    setShowSubTaskForm(false);
    setSubTaskDescription('');
  };

  const handleAddSubTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the sub-task data to the backend and associate it with the parent task
      const response = await axios.post('/backend/add_sub_task', {
        task: subTaskDescription,
        status: status,
        parent_task_id: newlyAddedTask.task_id, // Use the ID of the newly added parent task
      });

      if (response.status === 200) {
        if (response.data) {
          // Add the newly created sub-task to the subTasks state
          // setSubTasks(response.data);
          setSubTasks([...subTasks, response.data]);
          console.log('Sub-Task added:', response.data);
          setShowSubTaskForm(false); // Hide the sub-task form
          setSubTaskDescription(''); // Clear the sub-task input field
        } else {
          console.error('Response data is empty');
        }
      } else {
        console.error('Failed to add sub-task');
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
      {newlyAddedTask && (
        <div className="newly-added-task">
          <h2>Newly Added Task:</h2>
          <ul>
            <li key={newlyAddedTask.task_id}>
              {newlyAddedTask.task_description}
              <button
                className="add-sub-task-button"
                onClick={() => handleAddSubTask(newlyAddedTask)}
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
              <li key={subTask.sub_task.id}>
                {subTask.sub_task.task_description}
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
          {newlyAddedTask.task_description && (
            <h1>{newlyAddedTask.task_description}</h1>
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
