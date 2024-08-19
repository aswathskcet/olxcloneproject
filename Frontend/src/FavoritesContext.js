import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(new Set(JSON.parse(storedFavorites)));
    }
  }, []);

  const addFavorite = (itemId) => {
    setFavorites(prev => {
      const updatedFavorites = new Set(prev);
      updatedFavorites.add(itemId);
      localStorage.setItem('favorites', JSON.stringify([...updatedFavorites]));
      return updatedFavorites;
    });
  };

  const removeFavorite = (itemId) => {
    setFavorites(prev => {
      const updatedFavorites = new Set(prev);
      updatedFavorites.delete(itemId);
      localStorage.setItem('favorites', JSON.stringify([...updatedFavorites]));
      return updatedFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
