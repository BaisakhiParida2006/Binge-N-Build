import { Routes, Route, Navigate } from 'react-router-dom'
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />    
      </Routes>    
  );
}

export default App