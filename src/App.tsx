import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Details from "./pages/Details";
import Favourites from "./pages/Favourites";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";


function App() {
  

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bicycles/:id" element={<Details />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    
    </Router>
  )
}

export default App
