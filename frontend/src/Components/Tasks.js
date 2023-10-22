import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useApi } from '../Contexts/ApiProvider';
import Task from './Task';
import CreateTaskTree from './CreateTaskTreeList';
import { useTasksContext } from '../Contexts/TasksProvider';


function Tasks() {
    const tasks = useTasksContext();
    const rootTaskList = tasks.filter(t => t.parent_task_id === null && t.status !== 'completed');


    return (
        <>
            <h2>Tasks</h2>
            {rootTaskList === null ? (
                <p>Could not retrieve tasks.</p>
            ) : (
                <>
                {rootTaskList.length === 0 ? (
                    <p>There are no tasks.</p>
                ) : (
                    rootTaskList.map((task) => (
                    <Task key={task.id} task={task}/>
                    ))
                )}
                </>
            )}
            </>
        );
        }
        
export default Tasks;