import React from 'react';
import InfoAccordion from './InfoAccordion';
import SkillsAccordion from './SkillsAccordion';
import EducationAccordion from './EducationAccordion';

const DETAIL_IDS = {
    INFO: 'info',
    SKILLS: 'skills',
    EDU: 'education'
};

const DetailSection = ({ 
    data, 
    openDetail, 
    toggleDetail, 
    toggleDetailView 
}) => {
    return (
        <div id="detail-section" className="w-full max-w-2xl p-8 my-10 flex flex-col items-center grow">
            <h3 className="text-4xl font-bold mb-8 text-center text-white-400">
                Detail Profil
            </h3>

            {/* Hapus bg-gray-800 dari sini agar background tidak menutupi gambar di elemen ini */}
            <div className="p-8 rounded-2xl shadow-xl w-full border border-gray-700 space-y-4 backdrop-blur-sm bg-gray-800/80">
                <InfoAccordion 
                    data={data}
                    isOpen={openDetail === DETAIL_IDS.INFO}
                    onToggle={() => toggleDetail(DETAIL_IDS.INFO)}
                    isVisible={!!(data.birthplace || data.birthdate || data.about)}
                />

                <SkillsAccordion 
                    data={data}
                    isOpen={openDetail === DETAIL_IDS.SKILLS}
                    onToggle={() => toggleDetail(DETAIL_IDS.SKILLS)}
                    isVisible={!!data.skills?.length}
                />

                <EducationAccordion 
                    data={data}
                    isOpen={openDetail === DETAIL_IDS.EDU}
                    onToggle={() => toggleDetail(DETAIL_IDS.EDU)}
                    isVisible={!!data.education?.length}
                />

                <button
                    onClick={toggleDetailView}
                    className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105"
                >
                    Tutupi Detail dan Kembali ke Profil
                </button>
            </div>
        </div>
    );
};

export default DetailSection;