import React, { useEffect, useState } from 'react';
import DrinkDisplay from './DrinkDisplay';

function AllUsers() {
  const [usersWithDrinks, setUsersWithDrinks] = useState([]);

  useEffect(() => {
    fetchUsersWithDrinks();
  }, []);

  const fetchUsersWithDrinks = async () => {
    try {
      const response = await fetch('/users-with-drinks');
      if (response.ok) {
        const data = await response.json();
        setUsersWithDrinks(data);
      } else {
        console.error('Failed to fetch users with drinks');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>All Users with Their Favorite Drinks</h2>
      <ul>
        {usersWithDrinks.map((user) => (
          <li key={user.id}>
            <h3>{user.username}</h3>
            
            <h4>Favorite Drinks:</h4>
            <ul>
              {user.favoriteDrinks.map((drink) => (
                <li key={drink.id}>
                  <DrinkDisplay drink={drink} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllUsers;
