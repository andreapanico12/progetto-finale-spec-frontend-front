import { useBicycles } from '../contexts/BicyclesContext';

function CategoryFilter() {
  const { selectedCategory, setSelectedCategory, categories, scrollPositionRef } = useBicycles();

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
