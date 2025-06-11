// pages/ComparePage.tsx
import { useEffect, useState } from 'react';
import { useCompare } from '../contexts/CompareContext';
import { useBicycleContext } from '../contexts/BicycleContext';
import type { Bicycle } from '../types';

function ComparePage() {
  const { selectedId1, selectedId2, setSelectedId1, setSelectedId2, clearSelection } = useCompare();
  const { bicycles } = useBicycleContext();
  const [bike1, setBike1] = useState<Bicycle | null>(null);
  const [bike2, setBike2] = useState<Bicycle | null>(null);

  useEffect(() => {
    if (selectedId1 !== null) {
      fetch(`http://localhost:3001/bicycles/${selectedId1}`)
        .then(res => res.json())
        .then(data => setBike1(data.bicycle));
    } else {
      setBike1(null);
    }
  }, [selectedId1]);

  useEffect(() => {
    if (selectedId2 !== null) {
      fetch(`http://localhost:3001/bicycles/${selectedId2}`)
        .then(res => res.json())
        .then(data => setBike2(data.bicycle));
    } else {
      setBike2(null);
    }
  }, [selectedId2]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Confronta Biciclette</h1>

      <div className="row mb-3">
        <div className="col-md-6">
          <select
            className="form-select"
            value={selectedId1 ?? ''}
            onChange={(e) => setSelectedId1(e.target.value ? parseInt(e.target.value) : null)}
          >
            <option value="">Seleziona prima bici</option>
            {bicycles.map(bike => (
              <option key={bike.id} value={bike.id}>{bike.title}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={selectedId2 ?? ''}
            onChange={(e) => setSelectedId2(e.target.value ? parseInt(e.target.value) : null)}
          >
            <option value="">Seleziona seconda bici</option>
            {bicycles.map(bike => (
              <option key={bike.id} value={bike.id}>{bike.title}</option>
            ))}
          </select>
        </div>
      </div>

      {(bike1 || bike2) && (
        <div className="row mt-4">
          {[bike1, bike2].map((bike, index) => (
            <div key={index} className="col-md-6">
              {bike ? (
                <div className="card mb-4">
                  <img src={bike.imageUrl} className="card-img-top" alt={bike.title} />
                  <div className="card-body">
                    <h5 className="card-title">{bike.title}</h5>
                    <p className="card-text">Categoria: {bike.category}</p>
                    <p className="card-text">Marca: {bike.brand}</p>
                    <p className="card-text">Peso: {bike.weightKg} kg</p>
                    <p className="card-text">Materiale telaio: {bike.frameMaterial}</p>
                    <p className="card-text">Freni: {bike.brakeType}</p>
                    <p className="card-text">Dimensione ruote: {bike.wheelSize}"</p>
                    <p className="card-text">Elettrica: {bike.isElectric ? 'Sì' : 'No'}</p>
                  </div>
                </div>
              ) : (
                <p>Seleziona una bici da confrontare</p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-3">
        <button className="btn btn-secondary" onClick={clearSelection}>Reset</button>
      </div>
    </div>
  );
}

export default ComparePage;
