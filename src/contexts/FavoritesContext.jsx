import { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (bike) => {
    setFavorites((prev) =>
      prev.find((b) => b.id === bike.id) ? prev : [...prev, bike]
    );
  };

  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((bike) => bike.id !== id));
  };

  const isFavorite = (id) => favorites.some((bike) => bike.id === id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
