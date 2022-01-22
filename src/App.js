import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./views/Main/Main";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register"
import Home from "./views/Home/Home";
import Verification from "./views/Verification/Verification";

const App = () => {
  return (
      <Routes>
        <Route  path="/" element={<Main/>} />
        <Route  path="/login" element={<Login/>} />
        <Route  path="/register" element={<Register/>} />
        <Route  path="/home" element={<Home/>} />
        <Route  path="/verification" element={<Verification />} />
      </Routes>
  );
};
export default App;