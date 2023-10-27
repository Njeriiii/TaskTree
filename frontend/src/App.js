import React from 'react'; // Import React for creating components
import Container from 'react-bootstrap/Container'; // Import the Container component for layout
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Import React Router for routing

import ApiProvider from './Contexts/ApiProvider'; // Import the API provider context
import { AuthProvider } from './Contexts/AuthProvider'; // Import the authentication provider context
import { TasksProvider } from './Contexts/TasksProvider'; // Import the tasks provider context

import Header from "./Components/Header"; // Import the header component
import CreateBoard from './Components/CreateBoard'; // Import the board creation component
import AddTasksPage from './Pages/AddTasksPage'; // Import the add tasks page
import EditTaskForm from './Components/EditTask'; // Import the task editing component
import EditBoardForm from './Components/EditBoard'; // Import the board editing component
import TaskArchive from './Pages/TaskArchive'; // Import the task archive page
import ChangeBoard from './Components/ChangeBoard'; // Import the board changing component
import DisplayTasks from './Pages/DisplayTasks'; // Import the task display page
import Registration from './Pages/Register'; // Import the registration page
import Login from './Pages/Login'; // Import the login page
import Logout from './Components/Logout'; // Import the logout component

import './App.css';


export default function App() {

  return (
    <Container fluid className="App">
      <BrowserRouter>
        <ApiProvider>
          <AuthProvider>
            <Header className="header"/>
              <TasksProvider>
                <Routes>
                  <Route path="*" element={<Navigate to="/" />} />
                  <Route path="/" element={<CreateBoard />} />
                  <Route path="/add_task" element={<AddTasksPage />} />
                  <Route path="/display_tasks" element={<DisplayTasks />} />
                  <Route path="/edit_task" element={<EditTaskForm />} />
                  <Route path="/edit_board" element={<EditBoardForm />} />
                  <Route path="/task_archive" element={<TaskArchive />} />
                  <Route path="/change_board" element={<ChangeBoard />} />
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