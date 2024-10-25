import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './Component/SignUp.jsx';
import Login from './Component/Login.jsx';
import Dashboard from './Component/Dashboard.jsx'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} /> 
      </Routes>
    </BrowserRouter>
  </StrictMode>
);