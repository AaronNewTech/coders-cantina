import React, { useState, useEffect } from "react";

function CreateDrink() {
  const [drinkName, setDrinkName] = useState("");
  const [ingredients, setIngredients] = useState(["", "", "", "", ""]);
  const [instructions, setInstructions] = useState("");
  const [formErrors, setFormErrors] = useState([]);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    fetch("/drinks")
      .then((r) => r.json())
      .then(setDrinks);
  }, []);

  const addDrink = (newDrink) => {
    setDrinks([...drinks, newDrink]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDrink = {
      strDrink: drinkName,
      strIngredient1: ingredients[0],
      strIngredient2: ingredients[1],
      strIngredient3: ingredients[2],
      strIngredient4: ingredients[3],
      strIngredient5: ingredients[4],
      strInstructions: instructions,
    };
  
    const response = await fetch("/create_drink", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDrink),
    });
  
    if (response.ok) {
      const drink = await response.json();
      addDrink(drink);
      setFormErrors([]);
    } else {
      const err = await response.json();
      setFormErrors(err.errors);
    }
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  return (
    <form onSubmit={handleSubmit} className="new-drink-form">
      <input onChange={(e) => setDrinkName(e.target.value)} placeholder="Drink Name" />
      {ingredients.map((ingredient, index) => (
        <input
          key={index}
          value={ingredient}
          onChange={(e) => handleIngredientChange(index, e.target.value)}
          placeholder={`Ingredient ${index + 1}`}
        />
      ))}
      <textarea
        onChange={(e) => setInstructions(e.target.value)}
        placeholder="Instructions"
        rows={5}
      />
      {formErrors.length > 0
        ? formErrors.map((err) => (
            <p key={err} style={{ color: "red" }}>
              {err}
            </p>
          ))
        : null}
      <input type="submit" value="Add Drink" />
    </form>
  );
}

export default CreateDrink;
