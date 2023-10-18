import React from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { createContext } from 'react';
import ApiProvider from '../Contexts/ApiProvider';

import '../App.css';
import Header from "../Components/Header";
import TaskListPage from '../Pages/TaskListPage';
import Tasks from '../Components/Tasks';

function TaskPage() { 

    return (
        <Tasks/>
    );
}
export default TaskPage;