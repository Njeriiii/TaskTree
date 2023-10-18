import React from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { createContext } from 'react';
import ApiProvider from './Contexts/ApiProvider';


import './App.css';
import Header from "./Components/Header";
import AddTasksPage from './Pages/AddTasksPage';
import TaskPage from './Pages/TaskPage';


export default function App() {
  return (
    <Container fluid className="App">
      <BrowserRouter>
        <Header />
        <ApiProvider>
          <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<TaskPage />} />
            <Route path="/add_task" element={<AddTasksPage />} />
          </Routes>
        </ApiProvider>
      </BrowserRouter>
    </Container>
  );
}