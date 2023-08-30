import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import LoginForm from "./LoginForm";
import Random from "./Random";
import Create from "./Create";


function App() {
  // return <h1>Phase 4 Project Client</h1>;


return (
  <div>
    <NavBar />
    <Routes >
    
      <Route exact path="/" element={<Home />} />
      <Route path="/LogIn" element={<LoginForm />} />
      <Route path="/Random" element={<Random />} />
      <Route path="/Create" element={<Create />} />
      


       
      
    </Routes>
    
  </div>
);
}

export default App;
