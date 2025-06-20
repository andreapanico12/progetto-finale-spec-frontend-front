import { useBicycles } from '../contexts/BicyclesContext';

function SearchBar() {
  const { searchValue, setSearchValue, scrollPositionRef } = useBicycles();

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
