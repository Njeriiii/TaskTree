import React, {useEffect} from 'react';
import { useTasksContext } from '../Contexts/TasksProvider';

// The TaskArchive component is responsible for displaying a list of completed tasks.
// It leverages the useTasksContext hook to access the tasks data from a context provider. 
// and filters the tasks to obtain completed top-level tasks

function TaskArchive() {
    // Access the tasks data from the context provider
    const tasks = useTasksContext();

    // Filter the tasks to obtain completed top-level tasks
    const completedList = tasks.filter(t => t.status === 'completed');

    // The `useEffect` hook allows performing actions when the component mounts or when specific dependencies change.
    useEffect(() => {

    }, [completedList]); // perform actions when `completedList` changes


    return (
        <div className="tasks-archive-container">
            <h2 className="archived-tasks-title">Archived Tasks</h2>
            {completedList === null ? (
                // Display an error message if completedList is null (failed to retrieve tasks)
                <p className="error-message">Could not retrieve tasks.</p>
            ) : (
                <>
                    {completedList.length === 0 ? (
                        // Display a message when there are no completed tasks
                        <p className="not-found-message">There are no tasks.</p>
                    ) : (
                        // Map through the list of completed tasks and display their descriptions
                        completedList.map((task, index) => (
                            <p key={index} className="archived-task-description">{task.task_description}</p>
                        ))
                    )}
                </>
            )}
        </div>
);
}
        
export default TaskArchive;