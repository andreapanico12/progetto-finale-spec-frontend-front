import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';

function BicycleCard({ bike }) {

  const { isFavorite, removeFromFavorites, addToFavorites } = useFavorites();

  const handleHeartClick = (e) => {
    e.preventDefault();
    isFavorite(bike.id) ? removeFromFavorites(bike.id) : addToFavorites(bike);
  };

  return (

    <div className="card custom-card bg-contrast text-center h-100 shadow-sm overflow-hidden position-relative">
          <Link
    to={`/bicycles/${bike.id}`}
    className="text-decoration-none"
    > 
      <img
        src={
          bike.imageUrl?.trim()
            ? bike.imageUrl
            : 'https://placehold.co/600x400'
        }
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://placehold.co/600x400';
        }}
        alt={bike.title}
        className="card-img-top"
        style={{ height: '180px', objectFit: 'cover' }}
      />
      </Link>
      <button
          onClick={handleHeartClick}
          className="position-absolute bottom-0 end-0 m-2 btn p-1"
          style={{ background: 'transparent', border: 'none' }}
        >
          <i
            className={`bi ${isFavorite(bike.id) ? 'bi-heart-fill' : 'bi-heart'}`}
            style={{ fontSize: '1.4rem', color: 'red' }}
          ></i>
        </button>
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title fw-semibold text-danger">{bike.title}</h5>
          <p className="mb-2">{bike.category}</p>
        </div>
      </div>
      
    </div>

  );
}

export default BicycleCard;
