import AddTasksPage from "../Pages/AddTasksPage";
import AddTask from "./AddTask";
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';



function Task({ task, setFilterParentTaskId }) { 

    const navigate = useNavigate(); // Get the navigation function
    const [showSubtasks, setShowSubtasks] = useState(false);

    const handleAddSubTaskClick = () => {
        // Redirect to TaskListPage after completing the process
        navigate(`/add_task?parent_task_id=${task.id}`);
    };

    const toggleSubtasks = () => {
        // Toggle the visibility of subtasks by changing the state of showSubtasks
        // set the local state variable showSubtasks to true or false to control the visibility of subtasks within the same component.
        setShowSubtasks(!showSubtasks);
        
        if (!showSubtasks) {
        // If subtasks are being shown (i.e., they are not visible)
        // Call a function in the parent component (Tasks) to set the filter based on parent_task_id
        // In this case, it sets the filterParentTaskId to the current task's id
        setFilterParentTaskId(task.id);
        } else {
        // If subtasks are being hidden (i.e., they are visible)
        // Reset the filter in the parent component (Tasks)
        // This means that there is no specific filter, so all tasks should be displayed
        setFilterParentTaskId(null);
        }
        };


    return (
        <div className="task-list-container">
            <div className="task-column">
                <ul>
                    <li key={task.id} className="task-item">
                        <div className="task-description" onClick={toggleSubtasks}>
                            {task.task_description}
                        </div>
                        <button onClick={handleAddSubTaskClick} className="add-subtask-button">
                            Add Subtask
                        </button>
                        {showSubtasks && task.subtasks && (
                            <ul>
                            {task.subtasks.map((subtask) => (
                                <li key={subtask.id}>{subtask.task_description}</li>
                            ))}
                            </ul>
                        )}
                        {/* <button onClick={() => markAsComplete(task.id)} className="mark-complete-button">
                            Mark as Complete
                        </button> */}
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default Task;

// {showSubtasks && (
//     <ul>
//     {task.subtasks.map(subtask => (
//         <li key={subtask.id}>{subtask.task_description}</li>
//     ))}
//     </ul>
// )}