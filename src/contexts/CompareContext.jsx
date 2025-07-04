import { createContext, useContext, useState } from 'react';

// CompareContext.jsx
// Questo contesto gestisce l'ID di due biciclette selezionate e fornisce il metodo per azzerare il confronto.
 
const CompareContext = createContext();

export function CompareProvider({ children }) {
  const [selectedId1, setSelectedId1] = useState(null);
  const [selectedId2, setSelectedId2] = useState(null);

  const clearSelection = () => {
    setSelectedId1(null);
    setSelectedId2(null);
  };

  return (
    <CompareContext.Provider value={{ selectedId1, setSelectedId1, selectedId2, setSelectedId2, clearSelection }}>
      {children}
    </CompareContext.Provider>
  );
}

export const useCompare = () => useContext(CompareContext);
