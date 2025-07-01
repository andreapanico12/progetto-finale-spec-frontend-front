import { createContext, useContext, useEffect, useState } from 'react';

// FavoritesContext.jsx
// Questo contesto gestisce lo stato dei preferiti delle biciclette

const FavoritesContext = createContext();


export function FavoritesProvider({ children }) {

  // Inizializza lo stato dei preferiti recuperandoli da localStorage, se non ci sono preferiti salvati li inizializza come array vuoto.
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  // Effettua il salvataggio dei preferiti in localStorage ogni volta che lo stato dei preferiti cambia.
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Funzione per aggiungere una bicicletta è nei preferiti
  const addToFavorites = (bike) => {
    setFavorites((prev) =>
      prev.find((b) => b.id === bike.id) ? prev : [...prev, bike]
    );
  };

  // Funzione per rimuovere una bicicletta dai preferiti
  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((bike) => bike.id !== id));
  };

  // Funzione per verificare se una bicicletta è nei preferiti
  const isFavorite = (id) => favorites.some((bike) => bike.id === id);

  // Funzione per azzerare i preferiti
  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite, clearFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
