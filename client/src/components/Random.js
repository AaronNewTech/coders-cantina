import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import DrinkDisplay from "./DrinkDisplay";

function Home() {
  const [drinks, setDrinks] = useState([]);
  const minDrinkId = 11000;
  const maxDrinkId = 12000;

  useEffect(() => {
    fetchRandomDrinks();
  }, []);

  const fetchRandomDrinks = async () => {
    const numDrinks = 4; // Number of random drinks to fetch
    let randomDrinks = [];

    while (randomDrinks.length < numDrinks) {
      const randomDrinkId = Math.floor(Math.random() * (maxDrinkId - minDrinkId + 1)) + minDrinkId;
      const response = await fetch(`http://localhost:3000/drinks/${randomDrinkId}`);
      
      if (response.ok) {
        const randomDrink = await response.json();
        randomDrinks.push(randomDrink);
      }
    }

    setDrinks(randomDrinks);
  };

  return (
    <div className="flex-container">
      {drinks.map((drink) => (
        <div className="display-container" key={drink.id}>
          <DrinkDisplay drink={drink} />
        </div>
      ))}
    </div>
  );
}

export default Home;
