import { useEffect, useState } from 'react';
import BicycleCard from '../components/BicycleCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import SortControl from '../components/SortControl';

function Home() {
  const [bicycles, setBicycles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetch('http://localhost:3001/bicycles')
      .then(res => res.json())
      .then(data => {
        setBicycles(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Errore nel fetch:', err);
        setIsLoading(false);
      });
  }, []);

  const filteredBicycles = bicycles
  .filter((bike) =>
    bike.title.toLowerCase().includes(searchValue.toLowerCase())
  )
  .filter((bike) =>
    selectedCategory === '' ? true : bike.category === selectedCategory
  )
  .sort((a, b) => {
    const valA = a[sortField].toLowerCase();
    const valB = b[sortField].toLowerCase();
    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  if (isLoading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" role="status" />
        <p>Caricamento biciclette...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
    <h1 className="mb-4">Biciclette disponibili</h1>

    <SearchBar onSearchChange={setSearchValue} />
    <CategoryFilter
      selectedCategory={selectedCategory}
      onCategoryChange={setSelectedCategory}
    />
    <SortControl
      sortField={sortField}
      sortOrder={sortOrder}
      onSortFieldChange={setSortField}
      onSortOrderChange={setSortOrder}
    />

    <div className="row">
      {filteredBicycles.map((bike) => (
        <div key={bike.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <BicycleCard bike={bike} />
        </div>
      ))}
    </div>
  </div>
  );
}

export default Home;