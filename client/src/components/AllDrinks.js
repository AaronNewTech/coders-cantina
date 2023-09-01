import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import DrinkDisplay from "./DrinkDisplay";

function AllDrinks() {
  const [drinks, setDrinks] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [updateData, setUpdateData] = useState({
    strDrink: "",
    strDrinkThumb: "",
    strIngredient1: "",
    strIngredient2: "",
    strIngredient3: "",
    strIngredient4: "",
    strIngredient5: "",
    strInstructions: "",
  });

  useEffect(() => {
    fetchAllDrinks();
  }, []);

  const fetchAllDrinks = async () => {
    try {
      const response = await fetch("http://localhost:3000/drinks");

      if (response.ok) {
        const allDrinks = await response.json();
        setDrinks(allDrinks);
      } else {
        console.error("Error fetching drinks:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching drinks:", error);
    }
  };

  const handleDelete = async (drinkId) => {
    try {
      const response = await fetch(`http://localhost:3000/drinks/${drinkId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Drink deleted successfully, update the drinks list by refetching
        fetchAllDrinks();
      } else {
        console.error("Error deleting drink:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting drink:", error);
    }
  };

  const handleEdit = (drink) => {
    // Set the selected drink for editing
    setSelectedDrink(drink);
    // Initialize the updateData with the current drink's data
    setUpdateData({
      strDrink: drink.strDrink || "",
      strDrinkThumb: drink.strDrinkThumb || "",
      strIngredient1: drink.strIngredient1 || "",
      strIngredient2: drink.strIngredient2 || "",
      strIngredient3: drink.strIngredient3 || "",
      strIngredient4: drink.strIngredient4 || "",
      strIngredient5: drink.strIngredient5 || "",
      strInstructions: drink.strInstructions || "",
    });
  };

  const handleUpdate = (drinkId) => {
    fetch(`http://localhost:3000/drinks/${drinkId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((response) => {
        if (response.ok) {
          // Drink updated successfully, refresh the drinks list
          fetchAllDrinks();
          setSelectedDrink(null); // Clear the selected drink
          setUpdateData({
            strDrink: updateData.drinkName,
            strDrinkThumb: updateData.imageURL,
            strIngredient1: updateData.ingredients[0],
            strIngredient2: updateData.ingredients[1],
            strIngredient3: updateData.ingredients[2],
            strIngredient4: updateData.ingredients[3],
            strIngredient5: updateData.ingredients[4],
            strInstructions: updateData.strInstructions,
          }); // Clear the update data
        } else {
          console.error("Error updating drink:", response.statusText);
        }
      })
      .catch((error) => console.error("Error updating drink:", error));
  };

  return (
    <div className="flex-container">
      {drinks.map((drink) => (
        <div className="display-container" key={drink.id}>
          <DrinkDisplay drink={drink} />
          <button onClick={() => handleDelete(drink.id)}>Delete</button>
          <button onClick={() => handleEdit(drink)}>Edit</button>
          {selectedDrink && selectedDrink.id === drink.id && (
            <div>
              <input
                type="text"
                placeholder="Drink Name"
                value={updateData.strDrink}
                onChange={(e) =>
                  setUpdateData({ ...updateData, strDrink: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Image URL"
                value={updateData.strDrinkThumb}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    strDrinkThumb: e.target.value,
                  })
                }
              />
              {[1, 2, 3, 4, 5].map((i) => (
                <input
                  type="text"
                  key={i}
                  placeholder={`Ingredient ${i}`}
                  value={updateData[`strIngredient${i}`]}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      [`strIngredient${i}`]: e.target.value,
                    })
                  }
                />
              ))}
              <textarea
                placeholder="Instructions"
                value={updateData.strInstructions}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    strInstructions: e.target.value,
                  })
                }
              />
              <button onClick={() => handleUpdate(selectedDrink.id)}>Save</button>
              <button onClick={() => setSelectedDrink(null)}>Cancel</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default AllDrinks;
