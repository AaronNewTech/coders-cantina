import React, { useEffect, useState } from "react";
import { Route, Routes, Router } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import LoginForm from "./LoginForm";


function App() {
  // return <h1>Phase 4 Project Client</h1>;


return (
  <div>
    <NavBar />
    <Routes >
    
      <Route exact path="/" element={<Home />} />
      
      <Route path="/LogIn" element={<LoginForm />} />
       
      
    </Routes>
    
  </div>
);
}

export default App;
