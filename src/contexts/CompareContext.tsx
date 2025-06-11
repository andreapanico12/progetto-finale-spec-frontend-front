import { createContext, useContext, useState } from 'react';
import type { Bicycle } from '../types';

// Tipi del contesto
interface CompareContextType {
  compared: Bicycle[];
  addToCompare: (bike: Bicycle) => void;
  removeFromCompare: (id: number) => void;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

// Provider
export const CompareProvider = ({ children }: { children: React.ReactNode }) => {
  const [compared, setCompared] = useState<Bicycle[]>([]);

  const addToCompare = (bike: Bicycle) => {
    setCompared(prev => {
      if (prev.find(b => b.id === bike.id)) return prev; // evita duplicati
      if (prev.length === 2) return prev; // massimo 2 elementi
      return [...prev, bike];
    });
  };

  const removeFromCompare = (id: number) => {
    setCompared(prev => prev.filter(b => b.id !== id));
  };

  const clearCompare = () => setCompared([]);

  return (
    <CompareContext.Provider value={{ compared, addToCompare, removeFromCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
};

// Hook custom per usare il contesto
export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) throw new Error('useCompare deve essere usato dentro CompareProvider');
  return context;
};
