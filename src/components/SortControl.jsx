function SortControl({ sortField, sortOrder, onSortFieldChange, onSortOrderChange }) {
  return (
    <div className="mb-4 d-flex gap-3">
      <div>
        <label className="form-label">Ordina per:</label>
        <select
          className="form-select"
          value={sortField}
          onChange={(e) => onSortFieldChange(e.target.value)}
        >
          <option value="title">Titolo</option>
          <option value="category">Categoria</option>
        </select>
      </div>
      <div>
        <label className="form-label">Ordine:</label>
        <select
          className="form-select"
          value={sortOrder}
          onChange={(e) => onSortOrderChange(e.target.value)}
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
    </div>
  );
}

export default SortControl;