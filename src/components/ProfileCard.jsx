import React from 'react';

const ProfileCard = ({ data, toggleDetailView, toggleZoom }) => {
    return (
        <div className="pt-20 flex grow justify-center items-center p-8 w-full">
            {/* Hapus bg-gray-800 dari sini agar background tidak menutupi gambar di elemen ini */}
            <div className="p-12 rounded-2xl shadow-xl max-w-2xl w-full text-center border border-gray-700 backdrop-blur-sm bg-gray-800/80"> {/* Tambahkan backdrop-blur-sm dan sesuaikan opacity */}

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
    );
};

export default ProfileCard;