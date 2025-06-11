type Props = {
  sortField: 'title' | 'category';
  sortOrder: 'asc' | 'desc';
  onSortFieldChange: (field: 'title' | 'category') => void;
  onSortOrderChange: (order: 'asc' | 'desc') => void;
};

function SortControl({
  sortField,
  sortOrder,
  onSortFieldChange,
  onSortOrderChange,
}: Props) {
  return (
    <div className="d-flex gap-3 mb-3 align-items-center">
      <div>
        <label className="form-label me-2">Ordina per:</label>
        <select
          className="form-select"
          value={sortField}
          onChange={(e) => onSortFieldChange(e.target.value as 'title' | 'category')}
        >
          <option value="title">Titolo</option>
          <option value="category">Categoria</option>
        </select>
      </div>

      <div>
        <label className="form-label me-2">Ordine:</label>
        <select
          className="form-select"
          value={sortOrder}
          onChange={(e) => onSortOrderChange(e.target.value as 'asc' | 'desc')}
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
    </div>
  );
}

export default SortControl;
