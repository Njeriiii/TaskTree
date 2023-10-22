import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useTasksContext } from '../Contexts/TasksProvider';
import EditTaskForm from './EditTask';
import { useApi } from '../Contexts/ApiProvider';


function Task({ task }) { 

    const navigate = useNavigate();
    const [showSubtasks, setShowSubtasks] = useState(false);
    const tasks = useTasksContext();
    const api = useApi(); // Initialize the API client using the custom hook

    const handleAddSubTaskClick = (e) => {
        const parentTaskId = e.target.getAttribute("data-task-id");
        navigate(`/add_task?parent_task_id=${parentTaskId}`);
    };

    const editTaskClick = () => {
        // Redirect to the edit task page with the task ID as a URL parameter
        console.log(task)
        navigate(`/edit_task?task_id=${task.id}`);
    };

    const toggleSubtasks = () => {
        console.log("Toggle subtasks clicked");
        setShowSubtasks(prevState => !prevState);
    };

    const moveTaskClick = () => {
        // Redirect to the edit task page with the task ID as a URL parameter
        console.log(task)
        navigate(`/change_parent?task_id=${task.id}`);
    };


    // Function to create a tree-like structure of tasks iteratively with corresponding depth
    const createTaskTreeList = (tasks, parentTaskId = null) => {
        const taskTree = [];
        const stack = [];

        // Push root tasks with depth 0 onto the stack
        stack.push({ task: null, depth: 0 });

        while (stack.length > 0) {
            const { task, depth } = stack.pop();

            if (task) {
                task.depth = depth;
                taskTree.push(task);
            }

            // Find subtasks of the current task
            const subtasks = tasks.filter(t => t.parent_task_id === (task ? task.id : parentTaskId));

            for (const subtask of subtasks) {
                stack.push({ task: subtask, depth: depth + 1 });
            }
        }

        return taskTree;
    }


    const markTaskAsComplete = async (taskId) => {
        try {
            // Make an API request to mark the task as complete (update its status)
            const response = await api.put(`/mark_task_complete/${taskId}`);

            if (response.status === 200) {
                // Reload the task list or update the task status in your context
                // For example, you can call a function to refresh the task list.
                // refreshTaskList();
                console.log('Task marked as complete:', taskId);
            } else {
                console.error('Failed to mark task as complete');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const subtaskList = showSubtasks ? createTaskTreeList(tasks, task.id) : [];

    return (
        <div className="task-list-container">
            <div className="task-column">
                <ul>
                    <li className="task-item">
                        <div className="task-description">
                            {task.task_description}
                        </div>
                        
                        <button onClick={toggleSubtasks} className="show-subtask-button">
                            Show Subtasks
                        </button>
                        <button onClick={editTaskClick} className="edit-task-button">
                        Edit Task
                        </button>
                        <button onClick={() => markTaskAsComplete(task.id)} className="mark-complete-button">
                            Mark as Complete
                        </button>
                        {subtaskList.map(subtask => (
                        <li
                        key={subtask.id}
                        data-depth={subtask.depth}
                        className="subtask-item"
                        style={{ marginLeft: `${subtask.depth * 40}px`}}
                        >
                            {subtask.task_description}
                            <button onClick={handleAddSubTaskClick} data-task-id={subtask.id} className="add-subtask-button">
                            Add Subtask
                            </button>
                            <button onClick={editTaskClick} className="edit-task-button">
                            Edit Task
                            </button>
                            <button onClick={() => markTaskAsComplete(task.id)} className="mark-complete-button">
                            Mark as Complete
                            </button>
                            <button onClick={moveTaskClick} className="mark-complete-button">
                            Move
                            </button>
                        </li>
                        ))}
                        <button onClick={handleAddSubTaskClick} data-task-id={task.id} className="add-subtask-button">
                            Add Subtask
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Task;