import { useState } from 'react';
import BicycleCard from '../components/BicycleCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import SortControl from '../components/SortControl';
import { useBicycles } from '../contexts/BicyclesContext';

function Home() {
  const { bicycles, isLoading } = useBicycles();
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');



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
    <>
    <section className="hero bg-dark text-white py-5 text-center">
      <div className="container">
       <h1 className="display-4 fw-bold">Scopri la tua bici ideale</h1>
      <p className="lead">Confronta modelli, categorie e caratteristiche in pochi clic</p>
      <a href="#bici" className="btn btn-danger mt-3">Inizia subito</a>
    </div>
    </section>

    <section id="bici" className="text-white py-5">
  <div className="container">
    <h2 className="mb-4">Biciclette disponibili</h2>

    <div className="bg-contrast rounded p-4 mb-4 shadow-sm">
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
    </div>

    <div className="row">
      {filteredBicycles.map((bike) => (
        <div key={bike.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <BicycleCard bike={bike} />
        </div>
      ))}
    </div>
  </div>
</section>

  </>
  );
}

export default Home;