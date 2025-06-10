import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-blue-600 p-4 text-white flex gap-4">
    <Link to="/">Home</Link>
    <Link to="/favourites">Preferiti</Link>
    <Link to="/details/1">Dettagli</Link>
    <Link to="/not-found">Not Found</Link>
  </nav>
);

export default Navbar;