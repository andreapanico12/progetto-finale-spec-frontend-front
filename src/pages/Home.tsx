import { useBicycleContext } from '../contexts/BicycleContext';
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import SortControl from '../components/SortControl';
import { Link } from 'react-router-dom';



function Home() {

  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortField, setSortField] = useState<'title' | 'category'>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { bicycles, isLoading } = useBicycleContext();

  const filteredBicycles = bicycles
  .filter((bike) =>
    bike.title.toLowerCase().includes(searchValue.toLowerCase())
  )
  .filter((bike) =>
    selectedCategory === '' ? true : bike.category === selectedCategory
  )
  .sort((a, b) => {
    const fieldA = a[sortField].toLowerCase();
    const fieldB = b[sortField].toLowerCase();
    if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
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


  if (filteredBicycles.length === 0) {
    return (
      <div className="container text-center mt-5">
        <p>Nessuna bicicletta trovata.</p>
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
      {filteredBicycles.map(bike => (
        console.log(bike),
        <div key={bike.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <div className="card h-100">
            <div className="card-body">
            <h5 className="card-title">
                <Link to={`/bicycles/${bike.id}`}>{bike.title}</Link>
            </h5>
              <h6 className="card-subtitle mb-2 text-muted">{bike.category}</h6>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  )

}

export default Home