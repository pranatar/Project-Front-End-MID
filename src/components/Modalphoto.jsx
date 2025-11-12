// src/components/ModalPhoto.jsx

export default function ModalPhoto({ photo, toggleZoom }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={toggleZoom}
    >
      <img
        src={photo || "/poto profil.jpeg"}
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
  );
}
