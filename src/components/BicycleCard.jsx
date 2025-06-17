import { Link } from 'react-router-dom';

function BicycleCard({ bike }) {
  return (
    <div className="card custom-card h-100 shadow-sm border-0">
      {bike.imageUrl && (
        <img
          src={bike.imageUrl}
          className="card-img-top"
          alt={bike.title}
          style={{ height: '180px', objectFit: 'cover' }}
        />
      )}
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">
            <Link to={`/bicycles/${bike.id}`} className="text-decoration-none text-dark fw-bold">
              {bike.title}
            </Link>
          </h5>
          <h6 className="card-subtitle text-muted">{bike.category}</h6>
        </div>
        <Link to={`/bicycles/${bike.id}`} className="btn btn-outline-danger btn-sm mt-3">
          Scopri di più
        </Link>
      </div>
    </div>
  );
}

export default BicycleCard;
