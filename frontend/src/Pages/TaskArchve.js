import React, { useState, useEffect } from 'react';
import { useTasksContext } from '../Contexts/TasksProvider';


function TaskArchive() {
    const tasks = useTasksContext();
    const completedList = tasks.filter(t => t.parent_task_id === null && t.status === 'completed');


    return (
        <>
            <h2>Tasks</h2>
            {completedList === null ? (
                <p>Could not retrieve tasks.</p>
            ) : (
                <>
                {completedList.length === 0 ? (
                    <p>There are no tasks.</p>
                ) : (
                    completedList.map((task) => (
                    <p>{task.task_description}</p>
                    ))
                )}
                </>
            )}
            </>
        );
        }
        
export default TaskArchive;