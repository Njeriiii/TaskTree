import React, { useEffect } from 'react';
import TaskTree from '../Components/TaskTree';
import { useLocation } from 'react-router-dom';
import { useTasksContext } from '../Contexts/TasksProvider'; // Import the context hook
import Task from './Task';
import TaskPage from '../Pages/TaskPage';

function DisplayTaskTree() {
    const tasks = useTasksContext();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const boardId = parseInt(queryParams.get('board_id')); // Get the board_id from the query parameter

    // Filter tasks based on the board_id
    const filteredTasks = tasks.filter(task => task.board_id === boardId && task.parent_task_id === null);
    console.log(filteredTasks)
    console.log(boardId)

return (
    <>
        {filteredTasks.map(task => (
            <Task key={task.id} task={task} />
        ))}
    </>
);

}

export default DisplayTaskTree;






