import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="p-4">
    <Link to="/">Home</Link>
    <Link to="/favourites">Preferiti</Link>
    <Link to="/compare">Confronta</Link>
  </nav>
);

export default Navbar;