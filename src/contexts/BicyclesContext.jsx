import { createContext, useContext, useEffect, useState } from 'react';

const BicycleContext = createContext();

export const BicycleProvider = ({ children }) => {
  const [bicycles, setBicycles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/bicycles')
      .then((res) => res.json())
      .then((data) => {
        setBicycles(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Errore nel caricamento biciclette:', err);
        setIsLoading(false);
      });
  }, []);

  return (
    <BicycleContext.Provider value={{ bicycles, isLoading }}>
      {children}
    </BicycleContext.Provider>
  );
};

export const useBicycles = () => {
  const context = useContext(BicycleContext);
  if (!context) throw new Error('useBicycles deve essere usato dentro BicycleProvider');
  return context;
};
