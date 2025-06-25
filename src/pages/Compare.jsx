import { useEffect, useState } from 'react';
import { useCompare } from '../contexts/CompareContext';
import { useFavorites } from '../contexts/FavoritesContext';

function Compare() {
  const [bike1, setBike1] = useState(null);
  const [bike2, setBike2] = useState(null);
  const [allBicycles, setAllBicycles] = useState([]);
  const { selectedId1, selectedId2, setSelectedId1, setSelectedId2, clearSelection } = useCompare();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  // Fetch completa di tutte le biciclette (ignora ricerca e filtro)
  useEffect(() => {
    fetch('http://localhost:3001/bicycles')
      .then(res => res.json())
      .then(data => setAllBicycles(data))
      .catch(err => console.error('Errore nel caricamento biciclette:', err));
  }, []);

  // Fetch singoli record per confronto
  useEffect(() => {
    if (selectedId1) {
      fetch(`http://localhost:3001/bicycles/${selectedId1}`)
        .then(res => res.json())
        .then(data => setBike1(data.bicycle));
    } else {
      setBike1(null);
    }

    if (selectedId2) {
      fetch(`http://localhost:3001/bicycles/${selectedId2}`)
        .then(res => res.json())
        .then(data => setBike2(data.bicycle));
    } else {
      setBike2(null);
    }
  }, [selectedId1, selectedId2]);

  const getValidImageUrl = (url) => {
    if (!url || url.trim() === '' || url.includes('example.com')) {
      return 'https://placehold.co/600x400';
    }
    return url;
  };

  return (
    <section className="text-white py-5">
      <div className="container">
        <h2 className="mb-4 text-center">Confronta due biciclette</h2>

        <div className="row mb-4 bg-contrast p-4 rounded shadow-sm">
          <div className="col-md-5 mb-2">
            <select
              className="form-select"
              value={selectedId1 || ''}
              onChange={(e) => setSelectedId1(e.target.value || null)}
            >
              <option value="">Seleziona prima bici</option>
              {allBicycles.map(bike => (
                <option key={bike.id} value={bike.id}>
                  {bike.title}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-5 mb-2">
            <select
              className="form-select"
              value={selectedId2 || ''}
              onChange={(e) => setSelectedId2(e.target.value || null)}
            >
              <option value="">Seleziona seconda bici</option>
              {allBicycles.map(bike => (
                <option key={bike.id} value={bike.id}>
                  {bike.title}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <button className="btn btn-outline-danger w-100" onClick={clearSelection}>
              Reset
            </button>
          </div>
        </div>

        <div className="row">
          {[bike1, bike2].filter(Boolean).map((bike) => (
            <div className="col-md-6 mb-4" key={bike.id}>
              <div className="card bg-contrast text-white border-1 rounded-4 shadow-sm h-100">
                <div className="card-body">
                  <h4 className="fw-bold">{bike.title}</h4>
                  <img
                    src={getValidImageUrl(bike.imageUrl)}
                    alt={bike.title}
                    className="card-img mb-3"
                  />
                  <div className='d-flex justify-content-between bg-compare p-3 rounded mb-3'>
                    <div>
                      <p><strong>Categoria:</strong> {bike.category}</p>
                      <p><strong>Marca:</strong> {bike.brand}</p>
                      <p><strong>Prezzo:</strong> {bike.price.toFixed(2)} €</p>
                      <p><strong>Materiale telaio:</strong> {bike.frameMaterial}</p>
                      
                    </div>
                    <div>
                      <p><strong>Tipo freni:</strong> {bike.brakeType}</p>
                      <p><strong>Dimensione ruote:</strong> {bike.wheelSize}"</p>
                      <p><strong>Peso:</strong> {bike.weightKg} kg</p>
                      <p><strong>Elettrica:</strong> {bike.isElectric ? 'Sì' : 'No'}</p>
                    </div>
                  </div>    
                  <button
                    className={`btn ${isFavorite(bike.id) ? 'btn-danger' : 'btn-outline-danger'} mt-2`}
                    onClick={() =>
                      isFavorite(bike.id)
                        ? removeFromFavorites(bike.id)
                        : addToFavorites(bike)
                    }
                  >
                    {isFavorite(bike.id) ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Compare;
