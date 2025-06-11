import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BicycleProvider } from './contexts/BicycleContext';
import { CompareProvider } from './contexts/CompareContext.tsx';
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BicycleProvider>
     <CompareProvider>
        <App />
      </CompareProvider>
    </BicycleProvider>
  </StrictMode>,
)
