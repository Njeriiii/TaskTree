import React from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { createContext } from 'react';
import ApiProvider from './Contexts/ApiProvider';


import './App.css';
import Header from "./Components/Header";
import AddTaskPage from './Pages/AddTaskPage';
import TaskListPage from './Pages/TaskListPage';


export default function App() {
  return (
    <Container fluid className="App">
      <BrowserRouter>
        <Header />
        <ApiProvider>
          <TaskListPage/>
          <Routes>
            <Route path="/add_task" element={<AddTaskPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ApiProvider>
      </BrowserRouter>
    </Container>
  );
}