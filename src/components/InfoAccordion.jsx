import React from 'react';

const InfoAccordion = ({ data, isOpen, onToggle, isVisible }) => {
    if (!isVisible || !(data.birthplace || data.birthdate || data.about)) return null;

    return (
        <div className={`border border-gray-700 rounded-lg overflow-hidden transition-all duration-300
            ${isOpen ? 'scale-[1.02] shadow-2xl shadow-blue-500/20 z-10' : ''}
        `}>
            <button
                onClick={onToggle}
                className="w-full text-left p-4 bg-gray-700 hover:bg-gray-600 flex justify-between items-center transition duration-300"
            >
                <h4 className="text-xl font-semibold text-white">Informasi Dasar & Tentang Saya</h4>
                <span className={`text-2xl transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    ▼
                </span>
            </button>

            <div className={`${isOpen ? 'block animate-fade-in' : 'hidden'}`}>
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
    );
};

export default InfoAccordion;