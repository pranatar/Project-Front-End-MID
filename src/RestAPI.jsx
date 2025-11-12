import { useEffect, useState, useRef } from "react";
import axios from "axios";

const DETAIL_IDS = {
    INFO: 'info',
    SKILLS: 'skills',
    EDU: 'education'
};

export default function RestAPI() {
    const [data, setData] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false);
    
    const [openDetail, setOpenDetail] = useState(null); 

    const [isDetailVisible, setIsDetailVisible] = useState(false); 

    const aboutRef = useRef(null);
    
    useEffect(() => { 
        axios
          .get("/db.json")
          .then((res) => setData(res.data.profile))
          .catch((err) => console.error("❌ Error loading data:", err));
    }, []);

    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
    };

    const toggleDetail = (id) => {
        setOpenDetail(openDetail === id ? null : id);
    };

    const toggleDetailView = () => {
        setIsDetailVisible(prev => {
            const nextState = !prev;
            if (nextState === false) {
                setOpenDetail(null);
            }
            return nextState;
        });
    };
    
    if (!data)
        return (
            <div className="flex justify-center items-center h-screen text-white text-xl bg-gray-900">
                Loading...
            </div>
        );

    // --- RENDER UTAMA DIMULAI ---
    return (
        // 💡 Perubahan utama untuk background blur: Hapus bg-gray-900.
        // Ganti dengan bg-gray-900/50 dan backdrop-blur-sm untuk efek blur di belakang elemen.
        <div 
            className="min-h-screen text-white flex flex-col items-center 
                       bg-gray-900/50 backdrop-blur-sm" // Lapisan transparan + Blur
        >
            
            {/* 1. NAVBAR (Teks "Welcome" sudah diterapkan) */}
            <nav className="w-full flex justify-between items-center p-6 bg-gray-800 shadow-md sticky top-0 z-10">
                <div className="text-2xl font-bold text-blue-400">
                    Welcome
                </div>
                
                <div className="space-x-4 text-sm sm:text-lg flex items-center">
                    
                    {data.contact && (
                        <a 
                            href={`https://wa.me/62${data.contact.replace(/^0|^\+62|\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-blue-400 font-bold transition duration-300 transform hover:scale-105 inline-flex items-center space-x-1"
                        >
                            <span className="text-pink-400">📞</span>
                            Kontak
                        </a>
                    )}
                    
                    {data.github && (
                        <a 
                            href={data.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-blue-400 font-bold transition duration-300 transform hover:scale-105 inline-flex items-center space-x-1"
                        >
                            <span className="text-xl">🔗</span>
                            <span className="hidden sm:inline">GitHub</span>
                        </a>
                    )}

                    {data.linkedin && (
                        <a 
                            href={data.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-blue-400 font-bold transition duration-300 transform hover:scale-105 inline-flex items-center space-x-1"
                        >
                            <span className="text-xl">💼</span>
                            <span className="hidden sm:inline">LinkedIn</span>
                        </a>
                    )}
                </div>
            </nav>

            {/* 2. KONTEN UTAMA */}
            
            {isDetailVisible ? (
                <div id="detail-section" className="w-full max-w-2xl p-8 my-10 flex flex-col items-center grow">
                    
                    <h3 className="text-4xl font-bold mb-8 text-center text-blue-400">
                        Detail Profil
                    </h3>
                    
                    {/* Kotak konten detail dengan latar belakang semi-transparan */}
                    <div className="p-8 rounded-2xl shadow-xl w-full border border-gray-700 space-y-4 bg-gray-800/80"> 
                        
                        {/* ACCORDION 1: Informasi Dasar */}
                        {(data.birthplace || data.birthdate || data.about) && (
                            <div className={`border border-gray-700 rounded-lg overflow-hidden transition-all duration-300 
                                ${openDetail === DETAIL_IDS.INFO ? 'scale-[1.02] shadow-2xl shadow-blue-500/20 z-10' : ''}
                            `}>
                                <button
                                    onClick={() => toggleDetail(DETAIL_IDS.INFO)}
                                    className="w-full text-left p-4 bg-gray-700 hover:bg-gray-600 flex justify-between items-center transition duration-300"
                                >
                                    <h4 className="text-xl font-semibold text-white">Informasi Dasar & Tentang Saya</h4>
                                    <span className={`text-2xl transform transition-transform duration-300 ${openDetail === DETAIL_IDS.INFO ? 'rotate-180' : 'rotate-0'}`}>
                                        ▼
                                    </span>
                                </button>
                                
                                <div className={`${openDetail === DETAIL_IDS.INFO ? 'block animate-fade-in' : 'hidden'}`}>
                                    <div className="p-4 bg-gray-800/90 space-y-3">
                                        <p className="text-gray-300">
                                            <span className="font-semibold text-blue-300">Tempat/Tanggal Lahir:</span> {data?.birthplace || '-'}, {data?.birthdate || '-'}
                                        </p>
                                        <p className="text-gray-300">
                                            <span className="font-semibold text-blue-300">Pengalaman Singkat:</span> {data?.about || 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* ACCORDION 2: Keahlian (Skills) - Dengan Icon */}
                        {data.skills?.length > 0 && (
                            <div className={`border border-gray-700 rounded-lg overflow-hidden transition-all duration-300 
                                ${openDetail === DETAIL_IDS.SKILLS ? 'scale-[1.02] shadow-2xl shadow-blue-500/20 z-10' : ''}
                            `}>
                                <button
                                    onClick={() => toggleDetail(DETAIL_IDS.SKILLS)}
                                    className="w-full text-left p-4 bg-gray-700 hover:bg-gray-600 flex justify-between items-center transition duration-300"
                                >
                                    <h4 className="text-xl font-semibold text-white">Keahlian (Skills)</h4>
                                    <span className={`text-2xl transform transition-transform duration-300 ${openDetail === DETAIL_IDS.SKILLS ? 'rotate-180' : 'rotate-0'}`}>
                                        ▼
                                    </span>
                                </button>
                                
                                <div className={`${openDetail === DETAIL_IDS.SKILLS ? 'block animate-fade-in' : 'hidden'}`}>
                                    <div className="p-4 bg-gray-800/90">
                                        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                                            {data.skills.map((skill, index) => {
                                                const iconKey = skill.toLowerCase();
                                                const iconPath = data.icons?.[iconKey];
                                                
                                                return (
                                                    <span 
                                                        key={index} 
                                                        className="bg-blue-600/50 text-blue-100 text-sm font-medium px-3 py-1 rounded-full flex items-center space-x-2 transition duration-300 hover:bg-blue-600"
                                                    >
                                                        {iconPath && (
                                                            <img 
                                                                src={iconPath} 
                                                                alt={`${skill} icon`} 
                                                                className="w-4 h-4 object-contain"
                                                            />
                                                        )}
                                                        {skill}
                                                    </span>
                                                )})}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* ACCORDION 3: Riwayat Pendidikan */}
                        {data.education?.length > 0 && (
                            <div className={`border border-gray-700 rounded-lg overflow-hidden transition-all duration-300 
                                ${openDetail === DETAIL_IDS.EDU ? 'scale-[1.02] shadow-2xl shadow-blue-500/20 z-10' : ''}
                            `}>
                                <button
                                    onClick={() => toggleDetail(DETAIL_IDS.EDU)}
                                    className="w-full text-left p-4 bg-gray-700 hover:bg-gray-600 flex justify-between items-center transition duration-300"
                                >
                                    <h4 className="text-xl font-semibold text-white">Riwayat Pendidikan</h4>
                                    <span className={`text-2xl transform transition-transform duration-300 ${openDetail === DETAIL_IDS.EDU ? 'rotate-180' : 'rotate-0'}`}>
                                        ▼
                                    </span>
                                </button>
                                
                                <div className={`${openDetail === DETAIL_IDS.EDU ? 'block animate-fade-in' : 'hidden'}`}>
                                    <div className="p-4 bg-gray-800/90">
                                        <ul className="space-y-3">
                                            {data.education.map((item, index) => (
                                                <li key={index} className="flex flex-col sm:flex-row justify-between items-start border-l-4 border-blue-400 pl-3">
                                                    <p className="text-gray-300 font-medium">
                                                        {item.school}
                                                    </p>
                                                    <span className="text-sm text-blue-400 mt-1 sm:mt-0 sm:ml-4 font-light italic text-left sm:text-right w-full sm:w-auto">
                                                        {item.level}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        <button 
                            onClick={toggleDetailView} 
                            className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105"
                        >
                            Tutupi Detail dan Kembali ke Profil
                        </button>
                    </div>
                </div>
            ) : (
                
                /* KONDISI 2: Tampilkan Kartu Profil Utama */
                <div id="about-section" ref={aboutRef} className="pt-20 flex grow justify-center items-center p-8 w-full"> 
                    {/* Kotak konten utama dengan latar belakang semi-transparan */}
                    <div className="p-12 rounded-2xl shadow-xl max-w-2xl w-full text-center border border-gray-700 bg-gray-800/80"> 
                        
                        <img
                            src={data?.photo || "/poto profil.jpeg"}
                            alt="Foto Profil"
                            onClick={toggleZoom}
                            className="w-40 h-40 rounded-full mb-8 shadow-lg border-4 border-blue-400 object-cover hover:scale-105 hover:shadow-blue-500/50 transition-all duration-500 mx-auto cursor-pointer"
                        />

                        <h1 className="text-5xl font-extrabold mb-3 text-white">
                            {data?.name}
                        </h1>
                        <h2 className="text-xl text-blue-400 mb-6">
                            {data?.profession}
                        </h2>
                        <p className="text-gray-300 text-lg leading-relaxed mb-8">
                            {data?.bio}
                        </p>

                        <button 
                            onClick={toggleDetailView} 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 inline-block"
                        >
                            Lihat Detail Profil
                        </button>

                    </div> 
                </div> 
            )}


            {/* 3. MODAL FOTO PROFIL (ZOOM) */}
            {isZoomed && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    onClick={toggleZoom} 
                >
                    <img 
                        src={data?.photo || "/poto profil.jpeg"}
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
        </div>
    );
}