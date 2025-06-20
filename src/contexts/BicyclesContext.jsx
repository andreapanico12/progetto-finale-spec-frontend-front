import { createContext, useContext, useEffect, useRef, useState } from 'react';

const BicycleContext = createContext();

export const BicycleProvider = ({ children }) => {
  const [bicycles, setBicycles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [categories, setCategories] = useState([]);
  const debounceRef = useRef(null);
  const scrollPositionRef = useRef(null); // Ref per memorizzare la posizione dello scroll

  // Fetch iniziale delle categorie
  useEffect(() => {
    fetch('http://localhost:3001/bicycles')
      .then((res) => res.json())
      .then((data) => {
        const uniqueCategories = [...new Set(data.map((bike) => bike.category))];
        setCategories(uniqueCategories);
      })
      .catch((err) => {
        console.error('Errore nel caricamento categorie:', err);
      });
  }, []);

  // Fetch biciclette con debounce su search e filtro categoria
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const query = [];
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
    }, 600);

    return () => clearTimeout(debounceRef.current);
  }, [searchValue, selectedCategory]);

  // Scroll alla posizione salvata quando cambia la lista di biciclette
  useEffect(() => {
    if (scrollPositionRef.current !== null) {
      setTimeout(() => {
        window.scrollTo({
          top: scrollPositionRef.current,
          behavior: 'smooth'
        });
        scrollPositionRef.current = null;
      }, 100);
    }
  }, [bicycles]);

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
        scrollPositionRef
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
