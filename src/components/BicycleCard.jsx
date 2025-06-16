function BicycleCard({ bike }) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{bike.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{bike.category}</h6>
      </div>
    </div>
  );
}

export default BicycleCard;