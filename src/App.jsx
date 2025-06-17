import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Details from './pages/Details'; 
import Compare from './pages/Compare';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
       <Route path="/bicycles/:id" element={<Details />} />
       <Route path="/compare" element={<Compare />} />
       <Route path="/favorites" element={<Favorites />} />
      </Routes>
   </Router>
   <Footer />
    </>
  )
}

export default App
