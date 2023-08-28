import React, { useEffect, useState } from "react";
import { Switch, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";


function App() {
  // return <h1>Phase 4 Project Client</h1>;


return (
  <div>
    <NavBar />

    
      <Route exact path="/" element={<Home />} />
      
      
       
      
    
    
  </div>
);
}

export default App;
