import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import DrinkDisplay from "./DrinkDisplay";

function Random() {
  const [randomDrink, setRandomDrink] = useState(null);
  const minDrinkId = 11000;
  const maxDrinkId = 12000;

  useEffect(() => {
    fetchRandomDrink();
  }, []);

  const fetchRandomDrink = async () => {
    let randomDrinkData = null;

    while (!randomDrinkData) {
      const randomDrinkId = Math.floor(Math.random() * (maxDrinkId - minDrinkId + 1)) + minDrinkId;
      const response = await fetch(`http://localhost:3000/drinks/${randomDrinkId}`);

      if (response.ok) {
        randomDrinkData = await response.json();
        // Fetch associated ingredients
        const ingredientsResponse = await fetch(`http://localhost:3000/ingredients/${randomDrinkId}`);
        if (ingredientsResponse.ok) {
          const ingredients = await ingredientsResponse.json();
          randomDrinkData.ingredients = ingredients;
        }
      }
    }

    setRandomDrink(randomDrinkData);
  };

  return (
    <div className="flex-container">
      {randomDrink && (
        <div className="display-container">
          <DrinkDisplay drink={randomDrink} />
        </div>
      )}
    </div>
  );
}

export default Random;
