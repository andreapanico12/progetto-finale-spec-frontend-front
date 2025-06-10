import { createContext, useContext, useEffect, useState } from 'react';
import type { Bicycle } from '../types';

type BicycleContextType = {
  bicycles: Bicycle[];
  isLoading: boolean;
};

const BicycleContext = createContext<BicycleContextType | undefined>(undefined);

export const BicycleProvider = ({ children }: { children: React.ReactNode }) => {
  const [bicycles, setBicycles] = useState<Bicycle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/bicycles')
      .then(res => res.json())
      .then(data => {
        setBicycles(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <BicycleContext.Provider value={{ bicycles, isLoading }}>
      {children}
    </BicycleContext.Provider>
  );
};

export const useBicycleContext = () => {
  const context = useContext(BicycleContext);
  if (!context) throw new Error('useBicycleContext must be used within a Provider');
  return context;
};
