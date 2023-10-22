import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { createContext } from 'react';
import ApiProvider from './Contexts/ApiProvider';
import { AuthProvider } from './Contexts/AuthProvider';
import PrivateRoute from './Components/PrivateRoute';


import './App.css';
import Header from "./Components/Header";
import AddTasksPage from './Pages/AddTasksPage';
import TaskPage from './Pages/TaskPage';
import { TasksProvider } from './Contexts/TasksProvider';
import TaskTreePage from './Pages/TaskTreePage';
import EditTaskForm from './Components/EditTask';
import TaskArchive from './Pages/TaskArchve';
import ChangeParentTask from './Components/ChangeParentTask';
import Registration from './Pages/Register';
import Login from './Pages/Login';
import Logout from './Components/Logout';

export default function App() {

  return (
    <Container fluid className="App">
      <BrowserRouter>
        <ApiProvider>
          <AuthProvider>
            <Header/>
              <TasksProvider>
                <Routes>
                  <Route path="*" element={<Navigate to="/" />} />
                  <Route path="/" element={<TaskPage />} />
                  <Route path="/add_task" element={ <PrivateRoute> <AddTasksPage /> </PrivateRoute>} />
                  <Route path="/task_tree" element={<TaskTreePage />} />
                  <Route path="/edit_task" element={<EditTaskForm />} />
                  <Route path="/task_archive" element={ <PrivateRoute> <TaskArchive /> </PrivateRoute>} />
                  <Route path="/change_parent" element={<ChangeParentTask />} />
                  <Route path="/register" element={<Registration />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/logout" element={<Logout />} />
                </Routes>
              </TasksProvider>
          </AuthProvider>
        </ApiProvider>
      </BrowserRouter>
    </Container>
  );
}