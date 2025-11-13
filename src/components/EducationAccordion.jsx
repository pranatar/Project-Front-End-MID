import React from 'react';

const EducationAccordion = ({ data, isOpen, onToggle, isVisible }) => {
    if (!isVisible || !data.education || data.education.length === 0) return null;

    return (
        <div className={`border border-gray-700 rounded-lg overflow-hidden transition-all duration-300
            ${isOpen ? 'scale-[1.02] shadow-2xl shadow-blue-500/20 z-10' : ''}
        `}>
            <button
                onClick={onToggle}
                className="w-full text-left p-4 bg-gray-700 hover:bg-gray-600 flex justify-between items-center transition duration-300"
            >
                <h4 className="text-xl font-semibold text-white">Riwayat Pendidikan</h4>
                <span className={`text-2xl transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    ▼
                </span>
            </button>

            <div className={`${isOpen ? 'block animate-fade-in' : 'hidden'}`}>
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
    );
};

export default EducationAccordion;