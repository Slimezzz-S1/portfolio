// COMPONENTS
import '@/index.css'
import App from '@/App'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter useTransitions={true}>
      <App />
    </HashRouter>
  </StrictMode>
)