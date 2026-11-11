import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' // Wajib dipanggil di sini agar styling Tailwind berfungsi 100%

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)