import { useEffect, useState } from 'react';
import { useCompare } from '../contexts/CompareContext';
import { useFavorites } from '../contexts/FavoritesContext';

function Compare() {
  const { selectedId1, setSelectedId1, selectedId2, setSelectedId2, clearSelection } = useCompare();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [bikes, setBikes] = useState([]);
  const [bike1, setBike1] = useState(null);
  const [bike2, setBike2] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/bicycles')
      .then(res => res.json())
      .then(data => setBikes(data));
  }, []);

  useEffect(() => {
    if (selectedId1) {
      fetch(`http://localhost:3001/bicycles/${selectedId1}`)
        .then(res => res.json())
        .then(data => setBike1(data.bicycle));
    } else {
      setBike1(null);
    }
  }, [selectedId1]);

  useEffect(() => {
    if (selectedId2) {
      fetch(`http://localhost:3001/bicycles/${selectedId2}`)
        .then(res => res.json())
        .then(data => setBike2(data.bicycle));
    } else {
      setBike2(null);
    }
  }, [selectedId2]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Comparatore biciclette</h1>

      <div className="row mb-4">
        <div className="col-md-5 mb-2">
          <select
            className="form-select"
            value={selectedId1 || ''}
            onChange={(e) => setSelectedId1(e.target.value || null)}
          >
            <option value="">Seleziona prima bici</option>
            {bikes.map(bike => (
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
            {bikes.map(bike => (
              <option key={bike.id} value={bike.id}>
                {bike.title}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <button className="btn btn-outline-secondary w-100" onClick={clearSelection}>
            Reset
          </button>
        </div>
      </div>

      <div className="row">
        {[bike1, bike2].map((bike, index) => (
          <div key={index} className="col-md-6">
            {bike ? (
              <div className="card mb-4">
                <div className="card-body">
                  <div>
                  <h4 className="card-title">{bike.title}</h4>
                  <p><strong>Categoria:</strong> {bike.category}</p>
                  <p><strong>Marca:</strong> {bike.brand}</p>
                  <p><strong>Materiale telaio:</strong> {bike.frameMaterial}</p>
                  <p><strong>Tipo freni:</strong> {bike.brakeType}</p>
                  <p><strong>Dimensione ruote:</strong> {bike.wheelSize}"</p>
                  <p><strong>Peso:</strong> {bike.weightKg} kg</p>
                  <p><strong>Elettrica:</strong> {bike.isElectric ? 'Sì' : 'No'}</p>
                  {bike.imageUrl && (
                    <img src={bike.imageUrl} alt={bike.title} className="img-fluid my-3" />
                  )}
                  </div>


                  <button
                    className={`btn ${isFavorite(bike.id) ? 'btn-danger' : 'btn-primary'} mt-2`}
                    onClick={() =>
                      isFavorite(bike.id)
                        ? removeFromFavorites(bike.id)
                        : addToFavorites(bike)
                    }
                  >
                    {isFavorite(bike.id)
                      ? 'Rimuovi dai preferiti'
                      : 'Aggiungi ai preferiti'}
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-muted">Nessuna bici selezionata</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Compare;
