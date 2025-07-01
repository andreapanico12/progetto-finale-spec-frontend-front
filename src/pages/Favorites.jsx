import { useFavorites } from '../contexts/FavoritesContext';
import BicycleCard from '../components/BicycleCard';

// Favorites.jsx permette di visualizzare le biciclette preferite dell'utente. Utilizza la componente BicycleCard per mostrare ogni bicicletta e fornisce un pulsante per svuotare la lista dei preferiti.

import React from 'react';
function Favorites() {

  // Importa gli hook per gestire le biciclette preferite
  const { favorites, clearFavorites } = useFavorites();

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Le tue biciclette preferite</h1>


      {favorites.length > 0 && (
        <button className="btn btn-outline-danger mb-3" onClick={clearFavorites}>
          Svuota preferiti
        </button>
      )}

      {favorites.length === 0 ? (
        <p>Nessuna bicicletta nei preferiti.</p>
      ) : (
        <div className="row">
          {favorites.map((bike) => (
            <div key={bike.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex flex-column">
              <BicycleCard bike={bike} />

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
