import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";

function CreateDrink() {
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

  const formik = useFormik({
    initialValues: {
      drinkName: "",
      ingredients: ["", "", "", "", ""],
      instructions: "",
      imageURL: "", // Add image URL field
    },
    onSubmit: async (values) => {
      const newDrink = {
        strDrink: values.drinkName,
        strDrinkThumb: values.imageURL,
        strIngredient1: values.ingredients[0],
        strIngredient2: values.ingredients[1],
        strIngredient3: values.ingredients[2],
        strIngredient4: values.ingredients[3],
        strIngredient5: values.ingredients[4],
        strInstructions: values.instructions,
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
        formik.resetForm();
        setFormErrors([]);
      } else {
        const err = await response.json();
        setFormErrors(err.errors);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form">
      <input
        id="drinkName"
        name="drinkName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.drinkName}
        placeholder="Drink Name"
      />
      {formik.values.ingredients.map((ingredient, index) => (
        <input
          key={index}
          id={`ingredients[${index}]`}
          name={`ingredients[${index}]`}
          type="text"
          onChange={formik.handleChange}
          value={formik.values.ingredients[index]}
          placeholder={`Ingredient ${index + 1}`}
        />
      ))}
      <textarea
        id="instructions"
        name="instructions"
        onChange={formik.handleChange}
        value={formik.values.instructions}
        placeholder="Instructions"
        rows={5}
      />
      {/* Add input for the image URL */}
      <input
        id="imageURL"
        name="imageURL"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.imageURL}
        placeholder="Image URL"
      />
      {formErrors.length > 0
        ? formErrors.map((err, index) => (
            <p key={index} style={{ color: "red" }}>
              {err}
            </p>
          ))
        : null}
      <input type="submit" value="Add Drink" />
    </form>
  );
}

export default CreateDrink;
