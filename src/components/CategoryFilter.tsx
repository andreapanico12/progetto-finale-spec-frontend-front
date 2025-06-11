type Props = {
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
};

const categories = [
  '', // Vuoto per "tutte"
  'City Bike',
  'Mountain Bike',
  'Gravel',
  'Road',
  'Electric',
];

function CategoryFilter({ selectedCategory, onCategoryChange }: Props) {
  return (
    <div className="mb-3">
      <select
        className="form-select"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">Tutte le categorie</option>
        {categories.slice(1).map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;