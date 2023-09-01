import React, { useState } from "react";
import DrinkDisplay from "./DrinkDisplay";

function ParentComponent() {
  const [favoriteDrinks, setFavoriteDrinks] = useState([]);

  const handleFavoriteClick = async (drinkId) => {
    // Send a POST request to add the drink to the user's favorites
    const response = await fetch("/add_to_favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ drinkId }),
    });

    if (response.ok) {
      const favoriteDrink = await response.json();
      setFavoriteDrinks([...favoriteDrinks, favoriteDrink]);
    } else {
      // Handle error
    }
  };

  return (
    <div>
      {/* ... (other content) ... */}

      {favoriteDrinks.map((favoriteDrink) => (
        <DrinkDisplay key={favoriteDrink.id} drink={favoriteDrink} />
      ))}
    </div>
  );
}

export default ParentComponent;
