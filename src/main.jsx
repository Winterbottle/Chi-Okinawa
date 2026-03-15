import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Itinerary from './itinerary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Itinerary />
  </StrictMode>
)
