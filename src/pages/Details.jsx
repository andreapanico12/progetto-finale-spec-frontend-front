import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function Details() {
  const { id } = useParams();
  const [bike, setBike] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <>
        <div className="container mt-4">
      <h1 className="mb-3">{bike.title}</h1>
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
    <div className='container mt-4'>
    <Link to="/" className="btn btn-secondary mt-3">← Torna alla lista</Link>
    </div>
    
    </>


  );
}

export default Details;