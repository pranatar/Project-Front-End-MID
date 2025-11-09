import { useEffect, useState } from "react";
import axios from "axios";

export default function RestAPI() {
  const [data, setData] = useState(null);
  
  // HANYA PERLU DUA STATE TOGGLE: Detail/Education dan Zoom Foto
  // 1. State untuk Detail Pribadi (Sekarang mencakup Pendidikan)
  const [showDetails, setShowDetails] = useState(false); 
  // 2. State untuk mengontrol zoom foto profil
  const [isZoomed, setIsZoomed] = useState(false); 

  useEffect(() => {
    axios
      .get("/db.json")
      .then((res) => setData(res.data.profile))
      .catch((err) => console.error("❌ Error loading data:", err));
  }, []);

  // Fungsi toggleDetail sekarang mengontrol KEDUA bagian (Detail & Pendidikan)
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Fungsi untuk toggle Zoom Foto
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };


  if (!data)
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl">
        Loading...
      </div>
    );

  return (
    // START: Div Utama (Container utama halaman)
    <div className="min-h-screen relative overflow-hidden bg-gray-900 text-white">
      
      {/* 1. BACKGROUND FOTO TRANSPARAN ('bg_poto.jpeg') */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/bg_poto.jpeg')`, 
        }}
      >
        <div className="absolute inset-0 opacity-10 bg-black/50 grayscale"></div> 
      </div>
      
      {/* Overlay Gelap Tipis (untuk kontras) */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* 2. KARTU PROFIL (CONTENT) - Menggunakan z-10 */}
      <div className="relative z-10 flex justify-center items-center py-20 min-h-screen"> 
        
        {/* KARTU PROFIL */}
        <div className="bg-gray-900/70 p-10 rounded-2xl shadow-2xl max-w-lg w-full text-center border border-gray-700 hover:shadow-blue-500/30 transition duration-500 relative">
          
          {/* TEKS "HALO" DI SUDUT KIRI ATAS PROFIL */}
          <div className="absolute top-0 left-0 p-6 text-blue-300 text-xl font-bold">
            Halo!
          </div>
          
          {/* Foto Profil Kecil (Tambahkan onClick) */}
          <img
            src="/poto profil.jpeg"
            alt="Foto Profil"
            onClick={toggleZoom} // Memanggil fungsi zoom
            className="w-40 h-40 rounded-full mb-6 shadow-lg border-4 border-blue-400 object-cover hover:scale-105 hover:shadow-blue-500/50 transition-all duration-500 mx-auto cursor-pointer"
          />

          {/* Info Utama */}
          <h1 className="text-3xl font-bold mb-2 text-white">
            {data.name}
          </h1>
          <h2 className="text-lg text-blue-400 mb-4">
            {data.profession}
          </h2>
          <p className="text-gray-300 mb-4">{data.bio}</p>

          {/* ====================================================== */}
          {/* RIWAYAT DETAIL PRIBADI & PENDIDIKAN DENGAN SATU TOGGLE */}
          {/* ====================================================== */}
          <div className="mb-6 border-b border-gray-700 pb-4">
            <button
              onClick={toggleDetails}
              className="w-full text-base py-2 font-semibold text-blue-400 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition duration-300 flex justify-between items-center px-4"
            >
              Detail Tentang Saya
              <span className={`transform transition-transform duration-300 ${showDetails ? 'rotate-180' : 'rotate-0'}`}>
                ⬇️
              </span>
            </button>
            
            {showDetails && (
              <div className="mt-4 text-left space-y-3 p-4 rounded-lg border border-gray-700/50 bg-gray-800/30">
                
                {/* 1. Konten Detail Pribadi */}
                <h4 className="text-white font-bold mb-2 border-b border-gray-700/50 pb-2">Tempat Tanggal lahir</h4>
                <p className="text-gray-300 text-sm">📍 Lahir di: **{data.birthplace}**</p>
                <p className="text-gray-300 text-sm">🗓️ Tanggal: **{data.birthdate}**</p>

                {/* 2. Konten Riwayat Pendidikan */}
                <h4 className="text-white font-bold mb-2 border-y border-gray-700/50 py-2 mt-4">Riwayat Pendidikan</h4>
                {data.education.map((item, index) => (
                  <div key={index} className="border-b border-gray-700 pb-2 last:border-b-0">
                    <p className="text-white font-bold">{item.level}</p>
                    <p className="text-gray-400 text-sm">{item.school}</p> 
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* --- END: TOGGLE GABUNGAN --- */}

          {/* 3. BAGIAN SKILLS (CHIP TEKS) */}
          <h3 className="text-blue-400 text-lg font-semibold mb-2">
            Skills
          </h3>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-400/30"
              >
                {skill}
              </span>
            ))}
          </div>
          
          {/* Link Kontak */}
          <div className="flex justify-center gap-4 text-blue-400 flex-wrap border-t border-gray-700 pt-4 mt-6">
            <a
              href={data.github}
              target="_blank"
              className="hover:text-blue-300 hover:scale-110 transition-all"
            >
              🌐 GitHub
            </a>
            <a
              href={data.linkedin}
              target="_blank"
              className="hover:text-blue-300 hover:scale-110 transition-all"
            >
              💼 LinkedIn
            </a>
            <a
              href={`https://wa.me/62${data.contact.replace(/^0|^\+62/, '')}`}
              target="_blank"
              className="hover:text-blue-300 hover:scale-110 transition-all"
            >
              📞 Kontak
            </a>
          </div>
        </div> {/* PENUTUP: KARTU PROFIL */}
      </div> {/* PENUTUP: div relative z-10 */}

      {/* 5. MODAL FOTO PROFIL (ZOOM) */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={toggleZoom} 
        >
          <img 
            src="/poto profil.jpeg" 
            alt="Foto Profil Diperbesar" 
            className="max-w-[90vw] max-h-[90vh] rounded-xl shadow-2xl border-4 border-blue-400 object-contain cursor-pointer transition-all duration-500 transform scale-100 hover:scale-[1.02]"
            onClick={(e) => e.stopPropagation()} 
          />
          <button 
            onClick={toggleZoom} 
            className="absolute top-4 right-4 text-white text-3xl p-2 bg-black/50 rounded-full hover:bg-black/70 transition"
          >
            &times;
          </button>
        </div>
      )}
    </div> // PENUTUP: Div Utama
  )
}