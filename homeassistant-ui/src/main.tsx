import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <header className='bg-cyan-950 font-manrope tracking-tighter'>
      <div className="bg-[url('/sssquiggly.svg')] h-screen bg-cover">
        <App />
      </div>
    </header>
  </StrictMode >,
)
