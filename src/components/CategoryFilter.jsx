import { useBicycles } from '../contexts/BicyclesContext';


// CategoryFilter permette di filtrare le biciclette per categoria aggiornando il valore di selectedCategory nel contesto BicyclesContext.

function CategoryFilter() {
  const { selectedCategory, setSelectedCategory, categories, scrollPositionRef } = useBicycles();

  // Funzione per gestire il cambiamento della categoria selezionata e salvare la posizione di scroll corrente
  const handleChange = (e) => {
    if (scrollPositionRef && scrollPositionRef.current === null) {
      scrollPositionRef.current = window.scrollY;
    }
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="mb-3">
      <select
        className="form-select"
        value={selectedCategory}
        onChange={handleChange}
      >
        <option value="">Tutte le categorie</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
