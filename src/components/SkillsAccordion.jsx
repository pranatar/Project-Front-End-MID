import React from 'react';

const SkillsAccordion = ({ data, isOpen, onToggle, isVisible }) => {
    if (!isVisible || !data.skills || data.skills.length === 0) return null;

    return (
        <div className={`border border-gray-700 rounded-lg overflow-hidden transition-all duration-300
            ${isOpen ? 'scale-[1.02] shadow-2xl shadow-blue-500/20 z-10' : ''}
        `}>
            <button
                onClick={onToggle}
                className="w-full text-left p-4 bg-gray-700 hover:bg-gray-600 flex justify-between items-center transition duration-300"
            >
                <h4 className="text-xl font-semibold text-white">Keahlian (Skills)</h4>
                <span className={`text-2xl transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    ▼
                </span>
            </button>

            <div className={`${isOpen ? 'block animate-fade-in' : 'hidden'}`}>
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
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillsAccordion;