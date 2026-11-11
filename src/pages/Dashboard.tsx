import React, { useState } from 'react';
import { analyzeFoodText, analyzeFoodImage } from '../services/geminiService';
import type { LLMAnalysisResponse } from '../types/nutrition';

export const Dashboard: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<LLMAnalysisResponse[]>([]);
  const [activeTab, setActiveTab] = useState<'tracker' | 'diet'>('tracker');

  // Target Nutrisi Harian
  const targetCalories = 2000;
  const targetProtein = 60;
  const targetCarbs = 250;
  const targetFat = 55;

  const totalCalories = logs.reduce((sum, item) => sum + item.calories, 0);
  const totalProtein = logs.reduce((sum, item) => sum + item.protein, 0);
  const totalCarbs = logs.reduce((sum, item) => sum + item.carbs, 0);
  const totalFat = logs.reduce((sum, item) => sum + item.fat, 0);

  const calPercent = Math.min(Math.round((totalCalories / targetCalories) * 100), 100);
  const protPercent = Math.min(Math.round((totalProtein / targetProtein) * 100), 100);
  const carbsPercent = Math.min(Math.round((totalCarbs / targetCarbs) * 100), 100);
  const fatPercent = Math.min(Math.round((totalFat / targetFat) * 100), 100);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText && !selectedFile) return;

    setLoading(true);
    try {
      let result: LLMAnalysisResponse;
      if (selectedFile) {
        result = await analyzeFoodImage(selectedFile);
      } else {
        result = await analyzeFoodText(inputText);
      }

      setLogs([result, ...logs]);
      setInputText('');
      setSelectedFile(null);
      setImagePreview(null);
    } catch (err) {
      alert('Gagal menganalisis makanan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F8F4] text-slate-800 font-sans p-4 md:p-8">
      {/* Navigation Header */}
      <header className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center mb-6 bg-white/90 backdrop-blur-md p-4 md:p-5 rounded-3xl border border-emerald-100 shadow-sm gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-md shadow-emerald-200">
            🥗
          </div>
          <div>
            <h1 className="font-extrabold text-xl tracking-tight text-slate-800">
              NutriTrack <span className="text-emerald-500">AI</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">Fresh & Clean Health Tracker 🌿</p>
          </div>
        </div>

        {/* Switch Tab */}
        <div className="flex bg-emerald-50 p-1.5 rounded-2xl border border-emerald-100">
          <button
            onClick={() => setActiveTab('tracker')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'tracker'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-500 hover:text-emerald-600'
            }`}
          >
            📊 Daily Tracker & Grafik
          </button>
          <button
            onClick={() => setActiveTab('diet')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'diet'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                : 'text-slate-500 hover:text-emerald-600'
            }`}
          >
            🥑 Menu Diet Sehat
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {activeTab === 'tracker' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* KIRI: Input Form Makanan/Foto & Catatan Gizi */}
            <section className="lg:col-span-6 space-y-6">
              {/* Form Input & Foto */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-slate-800">Analisis Makanan 📸</h2>
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-bold">
                    Gemini AI
                  </span>
                </div>

                <form onSubmit={handleAnalyze} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">Ketik Menu Makanan</label>
                    <input
                      type="text"
                      placeholder="Contoh: Nasi goreng telur cepok + Jus alpukat"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="w-full px-4 py-3 text-sm rounded-2xl bg-emerald-50/40 border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">Atau Snap Foto Makanan 📷</label>
                    <div className="relative border-2 border-dashed border-emerald-200 rounded-2xl p-4 text-center hover:bg-emerald-50/50 transition cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      {imagePreview ? (
                        <div className="relative">
                          <img src={imagePreview} alt="Preview" className="h-36 w-full object-cover rounded-xl" />
                          <span className="text-[10px] text-emerald-700 bg-white px-2.5 py-1 rounded-full font-bold absolute bottom-2 right-2 shadow">
                            Foto Terpilih ✅
                          </span>
                        </div>
                      ) : (
                        <div className="py-4 text-slate-400">
                          <span className="text-3xl block mb-1">📤</span>
                          <span className="text-xs font-semibold text-emerald-600">Upload Foto Makanan</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || (!inputText && !selectedFile)}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-200 transition duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <span className="animate-spin">🌀</span> Menganalisis Foto/Menu...
                      </>
                    ) : (
                      <>✨ Analisis & Simpan Gizi</>
                    )}
                  </button>
                </form>
              </div>

              {/* Riwayat / Catatan Gizi */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100">
                <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center justify-between">
                  <span>Catatan Makanan Hari Ini 🍽️</span>
                  <span className="text-xs text-slate-400 font-normal">{logs.length} Item</span>
                </h3>

                {logs.length === 0 ? (
                  <div className="text-center py-8 text-slate-300">
                    <span className="text-3xl block mb-1">🍃</span>
                    <p className="text-xs font-medium">Belum ada makanan yang dicatat.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {logs.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3.5 bg-emerald-50/40 border border-emerald-100/60 rounded-2xl">
                        <div>
                          <h4 className="font-bold text-xs text-slate-800">{item.foodName}</h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            P: {item.protein}g | K: {item.carbs}g | L: {item.fat}g
                          </p>
                        </div>
                        <span className="font-black text-emerald-700 bg-white px-3 py-1.5 rounded-xl text-xs shadow-sm border border-emerald-100">
                          +{item.calories} kcal
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* KANAN: Grafik Progress Gizi Nutrisi */}
            <section className="lg:col-span-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100 sticky top-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-bold text-base text-slate-800">Grafik Progress Nutrisi 📈</h3>
                    <p className="text-xs text-slate-400">Target Harian Sehat Anda</p>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    {totalCalories} / {targetCalories} kcal
                  </span>
                </div>

                <div className="space-y-5">
                  {/* Grafik Kalori */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span className="text-slate-700">🔥 Total Kalori</span>
                      <span className="text-emerald-600">{calPercent}%</span>
                    </div>
                    <div className="w-full h-3.5 bg-emerald-50 rounded-full overflow-hidden p-0.5 border border-emerald-100">
                      <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${calPercent}%` }}></div>
                    </div>
                  </div>

                  {/* Grafik Protein */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span className="text-slate-700">🍗 Protein ({totalProtein}/{targetProtein}g)</span>
                      <span className="text-amber-600">{protPercent}%</span>
                    </div>
                    <div className="w-full h-3 bg-amber-50 rounded-full overflow-hidden p-0.5 border border-amber-100">
                      <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: `${protPercent}%` }}></div>
                    </div>
                  </div>

                  {/* Grafik Karbohidrat */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span className="text-slate-700">🍚 Karbohidrat ({totalCarbs}/{targetCarbs}g)</span>
                      <span className="text-sky-600">{carbsPercent}%</span>
                    </div>
                    <div className="w-full h-3 bg-sky-50 rounded-full overflow-hidden p-0.5 border border-sky-100">
                      <div className="h-full bg-sky-500 rounded-full transition-all duration-500" style={{ width: `${carbsPercent}%` }}></div>
                    </div>
                  </div>

                  {/* Grafik Lemak */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span className="text-slate-700">🥑 Lemak ({totalFat}/{targetFat}g)</span>
                      <span className="text-rose-600">{fatPercent}%</span>
                    </div>
                    <div className="w-full h-3 bg-rose-50 rounded-full overflow-hidden p-0.5 border border-rose-100">
                      <div className="h-full bg-rose-500 rounded-full transition-all duration-500" style={{ width: `${fatPercent}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Info Card Nutrisi */}
                <div className="mt-8 p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100">
                  <h4 className="text-xs font-bold text-emerald-900 mb-1">💡 Tips Kesehatan Gen Z</h4>
                  <p className="text-[11px] text-emerald-700 leading-relaxed">
                    Pastikan mengonsumsi air putih minimal 2 liter per hari dan seimbangkan asupan protein tinggi untuk menjaga energi aktif seharian!
                  </p>
                </div>
              </div>
            </section>

          </div>
        ) : (
          /* TAB MENU DIET SEHAT */
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-emerald-100">
            <div className="mb-6">
              <h2 className="text-xl font-black text-slate-800">Rekomendasi Menu Diet Sehat 🥑</h2>
              <p className="text-xs text-slate-400 mt-1">Panduan menu makanan kaya gizi untuk pola hidup sehat harianmu.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-emerald-50/50 p-5 rounded-3xl border border-emerald-100">
                <span className="text-3xl block mb-2">🍳</span>
                <h3 className="font-bold text-sm text-slate-800">Sarapan Sehat</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">Oatmeal Pisang + 2 Telur Rebus + Green Tea hangat.</p>
                <div className="mt-4 pt-3 border-t border-emerald-100/80 flex justify-between text-xs font-bold text-emerald-700">
                  <span>~350 kcal</span>
                  <span>Tinggi Protein</span>
                </div>
              </div>

              <div className="bg-emerald-50/50 p-5 rounded-3xl border border-emerald-100">
                <span className="text-3xl block mb-2">🥗</span>
                <h3 className="font-bold text-sm text-slate-800">Makan Siang</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">Dada Ayam Panggang + Nasi Merah + Tumis Buncis Brokoli.</p>
                <div className="mt-4 pt-3 border-t border-emerald-100/80 flex justify-between text-xs font-bold text-emerald-700">
                  <span>~500 kcal</span>
                  <span>Seimbang</span>
                </div>
              </div>

              <div className="bg-emerald-50/50 p-5 rounded-3xl border border-emerald-100">
                <span className="text-3xl block mb-2">🐟</span>
                <h3 className="font-bold text-sm text-slate-800">Makan Malam</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">Ikan Rebus/Panggang + Salad Sayur Alpukat Minyak Zaitun.</p>
                <div className="mt-4 pt-3 border-t border-emerald-100/80 flex justify-between text-xs font-bold text-emerald-700">
                  <span>~400 kcal</span>
                  <span>Rendah Karbo</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};