import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Workflow from './components/Workflow.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Workflow />
  </StrictMode>,
)
