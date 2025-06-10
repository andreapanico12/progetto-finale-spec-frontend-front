import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BicycleProvider } from './contexts/BicycleContext';

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BicycleProvider>
     <App />
    </BicycleProvider>
  </StrictMode>,
)
