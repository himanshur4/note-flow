import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router"

createRoot(document.getElementById('root')).render(
  <StrictMode >
    <BrowserRouter>
      <div className="relative bg-slate-950">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))] pointer-events-none">

        </div>

        <div className="absolute bottom-0 right-[-20%] top-[-10%] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))] pointer-events-none">

        </div>
        <App />
      </div>

    </BrowserRouter>
  </StrictMode>,
)
