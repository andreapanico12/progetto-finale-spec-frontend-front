import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Bicycle } from '../types';

function Details() {
  const { id } = useParams();
  const [bicycle, setBicycle] = useState<Bicycle | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/bicycles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBicycle(data.bicycle); // `data.bicycle` perché il backend restituisce un oggetto con `success` e `bicycle`
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) return <div className="container mt-5">Caricamento in corso...</div>;

  if (!bicycle) return <div className="container mt-5">Bicicletta non trovata.</div>;

  return (
    <div className="container mt-4">
      <h1 className="mb-3">{bicycle.title}</h1>
      <img src={bicycle.imageUrl} alt={bicycle.title} className="img-fluid mb-4" />
      <ul className="list-group">
        <li className="list-group-item"><strong>Categoria:</strong> {bicycle.category}</li>
        <li className="list-group-item"><strong>Marca:</strong> {bicycle.brand}</li>
        <li className="list-group-item"><strong>Materiale telaio:</strong> {bicycle.frameMaterial}</li>
        <li className="list-group-item"><strong>Tipo freni:</strong> {bicycle.brakeType}</li>
        <li className="list-group-item"><strong>Dimensione ruote:</strong> {bicycle.wheelSize}"</li>
        <li className="list-group-item"><strong>È elettrica?</strong> {bicycle.isElectric ? 'Sì' : 'No'}</li>
        <li className="list-group-item"><strong>Peso:</strong> {bicycle.weightKg} kg</li>
        <li className="list-group-item"><strong>Prezzo:</strong> €{bicycle.price}</li>
        <li className="list-group-item"><strong>Data creazione:</strong> {new Date(bicycle.createdAt).toLocaleDateString()}</li>
      </ul>
      <Link to="/" className="btn btn-primary mt-4">← Torna alla lista</Link>
    </div>
  );
}

export default Details;
