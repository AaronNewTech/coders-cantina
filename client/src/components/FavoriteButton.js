import React, { useState } from 'react';

function FavoriteButton({ userId, drinkId }) {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = async () => {
    try {
      const response = await fetch('/add-favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, drinkId }),
      });

      if (response.ok) {
        setIsFavorited(true);
      } else {
        console.error('Failed to add drink to favorites');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button onClick={handleFavoriteClick} disabled={isFavorited}>
      {isFavorited ? 'Favorited' : 'Add to Favorites'}
    </button>
  );
}

export default FavoriteButton;
