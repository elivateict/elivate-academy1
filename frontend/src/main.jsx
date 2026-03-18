import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { DashboardAuthProvider } from './context/DashboardAuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DashboardAuthProvider>
      <BrowserRouter>
         <App />
      </BrowserRouter>
    </DashboardAuthProvider>
  </StrictMode>,
)
