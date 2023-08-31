import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import DrinkDisplay from "./DrinkDisplay";

function Home() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    fetchSpecificDrinks();
  }, []);

  const fetchSpecificDrinks = async () => {
    const drinkIds = [11000, 11009, 11470, 11053];
    let specificDrinks = [];

    for (const drinkId of drinkIds) {
      const response = await fetch(`http://localhost:3000/drinks/${drinkId}`);
      
      if (response.ok) {
        const specificDrink = await response.json();
        specificDrinks.push(specificDrink);
      }
    }

    setDrinks(specificDrinks);
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
