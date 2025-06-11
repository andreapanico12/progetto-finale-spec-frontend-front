import { useState, useEffect } from 'react';

type Props = {
  onSearchChange: (value: string) => void;
};

function SearchBar({ onSearchChange }: Props) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Comunica al genitore ogni volta che il valore cambia
    onSearchChange(search);
  }, [search, onSearchChange]);

  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Cerca per titolo..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;