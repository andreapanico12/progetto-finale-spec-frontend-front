import { Link } from "react-router-dom";
import React from 'react';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4 py-3">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-uppercase" to="/">
          BikeCompare
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <div className="navbar-nav">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/compare">Comparatore</Link>
            <Link className="nav-link" to="/favorites">Preferiti</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
