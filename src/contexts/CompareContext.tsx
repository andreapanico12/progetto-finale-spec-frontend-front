import { createContext, useContext, useState } from 'react';

interface CompareContextType {
  selectedId1: number | null;
  selectedId2: number | null;
  setSelectedId1: (id: number | null) => void;
  setSelectedId2: (id: number | null) => void;
  clearSelection: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedId1, setSelectedId1] = useState<number | null>(null);
  const [selectedId2, setSelectedId2] = useState<number | null>(null);

  const clearSelection = () => {
    setSelectedId1(null);
    setSelectedId2(null);
  };

  return (
    <CompareContext.Provider
      value={{ selectedId1, selectedId2, setSelectedId1, setSelectedId2, clearSelection }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare deve essere usato dentro CompareProvider');
  }
  return context;
};
export default CompareContext;