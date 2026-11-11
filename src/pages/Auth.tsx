import React, { useState } from 'react';

interface AuthProps {
  onLoginSuccess: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-[#F3F8F4] flex items-center justify-center p-4 font-sans">
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-100">
        
        {/* Header Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-emerald-600 to-teal-400 rounded-2xl mx-auto flex items-center justify-center text-white text-3xl shadow-md shadow-emerald-200 mb-3">
            🥗
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            NutriTrack <span className="text-emerald-500">AI</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            {isRegister ? 'Buat akun baru kamu sekarang ✨' : 'Track your daily eats & health vibe 🌿'}
          </p>
        </div>

        {/* Form Auth */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Nama Lengkap</label>
              <input
                type="text"
                required
                placeholder="Masukkan nama kamu"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 text-sm rounded-2xl bg-emerald-50/40 border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">Email</label>
            <input
              type="email"
              required
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-sm rounded-2xl bg-emerald-50/40 border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-sm rounded-2xl bg-emerald-50/40 border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-200 transition duration-200 mt-2"
          >
            {isRegister ? 'Daftar Akun Baru 🚀' : 'Login 🚀'}
          </button>
        </form>

        {/* Opsi Switch Login / Register */}
        <div className="mt-6 text-center pt-4 border-t border-slate-100">
          {isRegister ? (
            <p className="text-xs text-slate-500">
              Sudah punya akun?{' '}
              <button
                onClick={() => setIsRegister(false)}
                className="text-emerald-600 font-bold hover:underline"
              >
                Masuk di sini
              </button>
            </p>
          ) : (
            <p className="text-xs text-slate-500">
              Belum punya akun?{' '}
              <button
                onClick={() => setIsRegister(true)}
                className="text-emerald-600 font-bold hover:underline"
              >
                Daftar sekarang
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};