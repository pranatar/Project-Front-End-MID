import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from './components/Navbar';
import ProfileCard from './components/ProfileCard';
import DetailSection from './components/DetailSection';
import PhotoModal from './components/PhotoModal';

export default function RestAPI() {
    const [data, setData] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false);

    const [openDetail, setOpenDetail] = useState(null);

    const [isDetailVisible, setIsDetailVisible] = useState(false);

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
        // --- Perubahan ada di sini ---
        <div className="min-h-screen text-white flex flex-col items-center">
            {/* Background with blur effect */}
            <div 
                className="fixed inset-0 bg-cover bg-center bg-no-repeat"
                style={{ 
                    backgroundImage: "url('/bg_poto.png')",
                    filter: "blur(4px)",
                    zIndex: -1
                }}
            />
            
            <Navbar data={data} />

            {/* 2. KONTEN UTAMA */}
            {isDetailVisible ? (
                <DetailSection 
                    data={data}
                    openDetail={openDetail}
                    toggleDetail={toggleDetail}
                    toggleDetailView={toggleDetailView}
                />
            ) : (
                <ProfileCard 
                    data={data}
                    toggleDetailView={toggleDetailView}
                    toggleZoom={toggleZoom}
                />
            )}

            <PhotoModal 
                data={data}
                isZoomed={isZoomed}
                toggleZoom={toggleZoom}
            />
        </div>
    );
}