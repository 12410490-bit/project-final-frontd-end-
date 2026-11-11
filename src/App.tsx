import React, { useState } from 'react';
import './index.css'; // Memastikan Tailwind ter-load 100%
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';

export function App() {
  // State untuk mengecek apakah user sudah login atau belum
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Jika belum login, tampilkan Halaman Auth/Login
  if (!isLoggedIn) {
    return <Auth onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  // Jika sudah login, tampilkan Halaman Dashboard Utamanya
  return (
    <div>
      {/* Bar navigasi atas untuk logout/ganti akun */}
      <div className="bg-emerald-900 text-white text-xs px-6 py-2 flex justify-between items-center">
        <span>Logged in as Demo User</span>
        <button 
          onClick={() => setIsLoggedIn(false)}
          className="hover:underline text-emerald-200 font-semibold"
        >
          Logout
        </button>
      </div>
      <Dashboard />
    </div>
  );
}

export default App;