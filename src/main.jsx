import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.jsx'
import { FavoritesProvider } from './contexts/FavoritesContext.jsx';
import { CompareProvider } from './contexts/CompareContext.jsx';
import { BicycleProvider } from './contexts/BicyclesContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BicycleProvider>
    <CompareProvider>
     <FavoritesProvider>
       <App />
     </FavoritesProvider>
    </CompareProvider>
  </BicycleProvider>
  </StrictMode>,
)
