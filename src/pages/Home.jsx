import { useEffect, useState } from 'react';
import BicycleCard from '../components/BicycleCard';

function Home() {
  const [bicycles, setBicycles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/bicycles')
      .then(res => res.json())
      .then(data => {
        setBicycles(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Errore nel fetch:', err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="text-center mt-5">Caricamento...</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Biciclette disponibili</h1>
      <div className="row">
        {bicycles.map(bike => (
          <div className="col-12 col-md-6 col-lg-4 mb-4" key={bike.id}>
            <BicycleCard bike={bike} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;