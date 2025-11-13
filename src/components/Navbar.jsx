import React from 'react';

const Navbar = ({ data }) => {
    return (
        <nav className="w-full flex justify-between items-center p-6 bg-gray-800 shadow-md sticky top-0 z-10">
            <div className="text-2xl font-bold text-blue-400">
                Welcome friend
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

                {data.instagram && (
                    <a
                        href={data.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-400 font-bold transition duration-300 transform hover:scale-105 inline-flex items-center space-x-1"
                    >
                        <span className="text-xl">📸</span>
                        <span className="hidden sm:inline">Instagram</span>
                    </a>
                )}
            </div>
        </nav>
    );
};

export default Navbar;