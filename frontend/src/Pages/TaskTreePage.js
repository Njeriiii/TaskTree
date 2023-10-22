import React, { useEffect } from 'react';
import TaskTree from '../Components/TaskTree';
import { useTasksContext } from '../Contexts/TasksProvider'; // Import the context hook

function TaskTreePage() {

    return (
        <div>
            <h1>Task Page</h1>
            <TaskTree />
        </div>
    );
}

export default TaskTreePage;

