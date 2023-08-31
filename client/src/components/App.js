


import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Random from "./Random";
import Create from "./Create";
import DrinkDisplay from "./DrinkDisplay";
import LoginForm from "./LoginForm";

function App() {
  const [login, setLogin] = useState(false);

  // const [randomCard, setRandomCard] = useState(null);

  // useEffect(() => {
  //   fetchRandomCard();
  // }, []);

  // const fetchRandomCard = () => {
  //   fetch("http://localhost:3000/drinks/1") // Fetch a single card by its ID (you might need to adjust the URL)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setRandomCard(data);
  //     });
  // };

  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/LogIn" element={<LoginForm login={login} setLogin={setLogin} />} />
        <Route path="/Random" element={<Random />} />
        <Route path="/Create" element={<Create />} />
      </Routes>

      
    </div>
  );
}

export default App;
