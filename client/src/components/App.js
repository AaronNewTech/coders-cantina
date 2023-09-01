


import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Random from "./Random";
import CreateUser from "./CreateUser";
import DrinkDisplay from "./DrinkDisplay";
import LoginForm from "./LoginForm";
import CreateDrink from "./CreateDrink";
import { LoginContext } from './LoginContext';

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
        <Route path="/create_drink" element={<CreateDrink />} />
        <Route path="/create_user" element={<CreateUser />} />
      </Routes>

      
    </div>
  );
}

export default App;
