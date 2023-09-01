import React from "react";

function DrinkDisplay({ drink, onFavoriteClick }) {
  if (!drink) {
    return null;
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

          <h3>Ingredients:</h3>
          <ul>
            {drink.drink_ingredient_associations.map((association) => (
              <li key={association.id}>
                {association.ingredient.name}
              </li>
            ))}
          </ul>
          <button onClick={() => onFavoriteClick(drink.id)}>Add to Favorites</button>
          
        </div>
      </div>
    </div>
  );
}

export default DrinkDisplay;
