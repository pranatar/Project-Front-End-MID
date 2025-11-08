import { useEffect, useState } from "react";
import axios from "axios";

export default function RestAPI() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("/db.json")
      .then((res) => setData(res.data.profile))
      .catch((err) => console.error("❌ Error loading data:", err));
  }, []);

  if (!data)
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl">
        Loading...
      </div>
    );

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center relative"
      style={{
        backgroundImage: `url(${data.photo})`, // Foto kamu jadi background
      }}
    >
      {/* Overlay transparan biar teks tetap jelas */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Kartu profil */}
      <div className="relative z-10 bg-gray-900/70 p-10 rounded-2xl shadow-2xl max-w-lg w-full text-center border border-gray-700 hover:shadow-blue-500/30 transition duration-500">
        <img
          src="/poto profil.jpeg"
          alt="Foto Profil"
          className="w-40 h-40 rounded-full mb-6 shadow-lg border-4 border-blue-400 object-cover hover:scale-105 hover:shadow-blue-500/50 transition-all duration-500 mx-auto"
        />

        <h1 className="text-3xl font-bold mb-2 text-white">
          {data.name}
        </h1>
        <h2 className="text-lg text-blue-400 mb-4">
          {data.profession}
        </h2>
        <p className="text-gray-300 mb-4">{data.bio}</p>

        <div className="text-gray-400 text-sm mb-4">
          📍 {data.birthplace} — 🗓️ {data.birthdate}
        </div>


        <h3 className="text-blue-400 text-lg font-semibold mb-2">
          Keahlian Utama
        </h3>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {data.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-400/30"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex justify-center gap-4 text-blue-400 flex-wrap">
          <a
            href={data.github}
            target="_blank"
            className="hover:text-blue-300 hover:scale-110 transition-all"
          >
            🌐 GitHub
          </a>
          <a
            href={data.linkedin}
            target="_blank"
            className="hover:text-blue-300 hover:scale-110 transition-all"
          >
            💼 LinkedIn
          </a>
          <a
            href={`https://wa.me/${data.contact}`}
            target="_blank"
            className="hover:text-blue-300 hover:scale-110 transition-all"
          >
            📞 Kontak
          </a>
        </div>
      </div>
    </div>
  );
}
