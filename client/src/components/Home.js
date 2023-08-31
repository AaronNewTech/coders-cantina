import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import DrinkDisplay from "./DrinkDisplay";

function Home() {
  const [drink, setDrink] = useState(null);
  const minDrinkId = 11000;
  const maxDrinkId = 12000;

  useEffect(() => {
    fetchRandomDrink();
  }, []);

  const fetchRandomDrink = async () => {
    let randomDrinkId;
    let randomDrink = null;

    while (!randomDrink) {
      randomDrinkId = Math.floor(Math.random() * (maxDrinkId - minDrinkId + 1)) + minDrinkId;
      const response = await fetch(`http://localhost:3000/drinks/${randomDrinkId}`);
      if (response.ok) {
        randomDrink = await response.json();
      }
    }

    setDrink(randomDrink);
  };

  return (
    <div className="flex-container">
      {drink && (
        <div className="display-container">
          <DrinkDisplay drink={drink} />
        </div>
      )}
    </div>
  );
}

export default Home;
