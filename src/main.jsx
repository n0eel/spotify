import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UniContext } from './context/Context.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter
    future={{
      v7_startTransition: true,
    }}
  >
    <UniContext>
      <App />
    </UniContext>
  </BrowserRouter>
)
