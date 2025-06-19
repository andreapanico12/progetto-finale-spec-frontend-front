import { useFavorites } from '../contexts/FavoritesContext';
import BicycleCard from '../components/BicycleCard';

function Favorites() {
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Le tue biciclette preferite</h1>

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
