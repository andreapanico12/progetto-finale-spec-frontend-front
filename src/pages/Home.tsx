import { useBicycleContext } from '../contexts/BicycleContext';
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';


function Home() {

  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { bicycles, isLoading } = useBicycleContext();

  const filteredBicycles = bicycles
  .filter((bike) =>
    bike.title.toLowerCase().includes(searchValue.toLowerCase())
  )
  .filter((bike) =>
    selectedCategory === '' ? true : bike.category === selectedCategory
  );

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


    <div className="row">
      {filteredBicycles.map(bike => (
        console.log(bike),
        <div key={bike.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">{bike.title}</h5>
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