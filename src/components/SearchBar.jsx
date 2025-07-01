import { useBicycles } from '../contexts/BicyclesContext';

function SearchBar() {

  // La componente SearchBar aggiorna il valore di ricerca e mantiene la posizione di scroll

  const { searchValue, setSearchValue, scrollPositionRef } = useBicycles();


  // Funzione per gestire il cambiamento del valore di ricerca e salvare la posizione di scroll corrente
  const handleChange = (e) => {
    scrollPositionRef.current = window.scrollY;
    setSearchValue(e.target.value);
  };

  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Cerca per titolo..."
        value={searchValue}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
