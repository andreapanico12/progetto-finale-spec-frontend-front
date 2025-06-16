import { Link } from "react-router-dom";
import React from 'react'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
     <Link className="navbar-brand" to="/">BikeCompare</Link>
     <div className="navbar-nav">
      <Link className="nav-link" to="/">Home</Link>
      <Link className="nav-link" to="/compare">Comparatore</Link>
      <Link className="nav-link" to="/favorites">Preferiti</Link>
    </div>
  </nav>
  )
}

export default Navbar