import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';

function Details() {
  const { id } = useParams();
  const [bike, setBike] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  useEffect(() => {
    fetch(`http://localhost:3001/bicycles/${id}`)
      .then(res => res.json())
      .then(data => {
        setBike(data.bicycle);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Errore nel fetch:', err);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) return <p className="text-center mt-4">Caricamento in corso...</p>;
  if (!bike) return <p className="text-center mt-4">Bicicletta non trovata.</p>;

  function isValidImageUrl(url) {
    return url && url.trim() !== '' && !url.includes('example.com');
  }
  
  const imageUrl = isValidImageUrl(bike.imageUrl)
    ? bike.imageUrl
    : 'https://placehold.co/600x400';

  const isThisFav = isFavorite(bike.id);

  return (
    <section className="text-white py-5">
      <div className="container">
        <div className="card bg-contrast text-white shadow-lg border-1 rounded-4 p-4">
          <div className="row g-4 align-items-center">
            <div className="col-md-6">
            <img
              src={imageUrl}
              alt={bike.title}
              className="card-img"
            />

            </div>
            <div className="col-md-6">
              <h2 className="fw-bold">{bike.title}</h2>
              <div className='bg-compare p-3 rounded-3 shadow-sm mt-3'>
                <p><strong>Categoria:</strong> {bike.category}</p>
                <p><strong>Marca:</strong> {bike.brand}</p>
                <p><strong>Materiale telaio:</strong> {bike.frameMaterial}</p>
                <p><strong>Tipo freni:</strong> {bike.brakeType}</p>
                <p><strong>Dimensione ruote:</strong> {bike.wheelSize}"</p>
                <p><strong>Peso:</strong> {bike.weightKg} kg</p>
                <p><strong>Elettrica:</strong> {bike.isElectric ? 'Sì' : 'No'}</p>

              </div>


              <div className="d-flex gap-3 mt-4 flex-wrap">
                <Link to="/" className="btn btn-outline-light">
                  ← Torna alla lista
                </Link>
                <button
                  className={`btn ${isThisFav ? 'btn-danger' : 'btn-outline-danger'}`}
                  onClick={() =>
                    isThisFav ? removeFromFavorites(bike.id) : addToFavorites(bike)
                  }
                >
                  {isThisFav ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Details;
