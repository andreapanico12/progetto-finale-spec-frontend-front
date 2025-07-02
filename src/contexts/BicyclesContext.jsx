import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
// BicycleContext.jsx
// Questo contesto gestisce lo stato delle biciclette, le categorie e le ricerche

const BicycleContext = createContext();

export const BicycleProvider = ({ children }) => {
  const [bicycles, setBicycles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [categories, setCategories] = useState([]);
  const debounceRef = useRef(null);
  const scrollPositionRef = useRef(null);

  // Fetch iniziale delle categorie (solo una volta)
  useEffect(() => {
    fetch('http://localhost:3001/bicycles')
      .then((res) => res.json())
      .then((data) => {
        // new Set() è un metodo Javascript che crea un oggetto Set che contiene solo valori unici, eliminando i duplicati.
        const uniqueCategories = [...new Set(data.map((bike) => bike.category))];
        setCategories(uniqueCategories);
      })
      .catch((err) => {
        console.error('Errore nel caricamento categorie:', err);
      });
  }, []);

  // Funzione fetch con useCallback 
  const debouncedFetch = useCallback(() => {
    const query = [];
  // encodeUriComponent() funzione che viene utilizzata per codificare una stringa come componente URL sostituendo i caratteri speciali con le loro rappresentazioni percentuali codificate.  
    if (searchValue) query.push(`search=${encodeURIComponent(searchValue)}`);
    if (selectedCategory) query.push(`category=${encodeURIComponent(selectedCategory)}`);
    const url = `http://localhost:3001/bicycles${query.length ? '?' + query.join('&') : ''}`;

    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBicycles(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Errore nel caricamento biciclette:', err);
        setIsLoading(false);
      });
  }, [searchValue, selectedCategory]);

  // useEffect con debounce applicato a debouncedFetch che permette di evitare chiamate API troppo frequenti ma ogni 600ms
  // Utilizza useRef per mantenere il riferimento al timeout tra i render
  // Utilizza debounce per limitare le chiamate API durante la digitazione
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      debouncedFetch();
    }, 600);

    return () => clearTimeout(debounceRef.current);
  }, [debouncedFetch]);

  // Scroll automatico alla posizione salvata con useRef
  // Quando le biciclette vengono aggiornate, scrollPositionRef viene utilizzato per scrollare alla posizione salvata, se scrollPositionRef.current è null allora non viene scrollata la pagina
  // scrollPositionRef.current viene resettato a null dopo lo scroll per evitare scroll multipli
  
  // useEffect(() => {
  //   if (scrollPositionRef.current !== null) {
  //     setTimeout(() => {
  //       // scrollTo() è un metodo che permette di scrollare la pagina alla posizione specificata
  //       window.scrollTo({
  //         top: scrollPositionRef.current,
  //         behavior: 'smooth',
  //       });
  //       scrollPositionRef.current = null;
  //     }, 100);
  //   }
  // }, [bicycles]);

  return (
    <BicycleContext.Provider
      value={{
        bicycles,
        isLoading,
        selectedCategory,
        setSelectedCategory,
        categories,
        searchValue,
        setSearchValue,
        scrollPositionRef,
      }}
    >
      {children}
    </BicycleContext.Provider>
  );
};

export const useBicycles = () => {
  const context = useContext(BicycleContext);
  if (!context) throw new Error('useBicycles deve essere usato dentro BicycleProvider');
  return context;
};
