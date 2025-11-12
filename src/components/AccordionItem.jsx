// components/AccordionItem.jsx
export default function AccordionItem({ title, children, isOpen, onClick }) {
  return (
    <div
      className={`border border-gray-700 rounded-lg overflow-hidden transition-all duration-300 ${
        isOpen ? 'scale-[1.02] shadow-2xl shadow-blue-500/20 z-10' : ''
      }`}
    >
      <button
        onClick={onClick}
        className="w-full text-left p-4 bg-gray-700 hover:bg-gray-600 flex justify-between items-center transition duration-300"
      >
        <h4 className="text-xl font-semibold text-white">{title}</h4>
        <span
          className={`text-2xl transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        >
          ▼
        </span>
      </button>
      <div className={`${isOpen ? 'block animate-fade-in' : 'hidden'}`}>
        {children}
      </div>
    </div>
  );
}
