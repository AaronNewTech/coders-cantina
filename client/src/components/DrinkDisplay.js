import React from "react";

function DrinkDisplay({ drink }) {
  if (!drink) {
    return null; // Return null if drink is not available
  }

  return (
    <div>
      <br />
      <br />
      <div className="flex-container">
        <div className="drink-container">
          <h2>Name: {drink.strDrink}</h2>
          
          <img src={drink.strDrinkThumb} alt={drink.strDrink} />
          <h3>Instructions: {drink.strInstructions}</h3>
          {drink.strVideo && ( // Conditionally render if strVideo exists
            <iframe
              title={drink.strDrink}
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${drink.strVideo}`}
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
}

export default DrinkDisplay;
