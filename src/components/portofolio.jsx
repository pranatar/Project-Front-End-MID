import React, { useEffect, useState } from "react";
import axios from "axios";

const Portfolio = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
      .get("/db.json")
      .then((res) => setProfile(res.data.profile))
      .catch((err) => console.error("Gagal memuat data:", err));
  }, []);

  if (!profile) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 to-gray-800 text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-lg w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-blue-400">{profile.name}</h1>
        <p className="text-lg text-gray-300 mb-4">{profile.profession}</p>

        <p className="text-gray-200 mb-4">{profile.about}</p>

        <p className="text-sm text-gray-400 mb-2">
          🗓️ Lahir: {profile.birth} — 📍 {profile.origin}
        </p>

        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2 text-blue-300">Keahlian</h2>
          <ul className="flex flex-wrap justify-center gap-2">
            {profile.skills.map((skill, i) => (
              <li
                key={i}
                className="bg-blue-500/20 px-3 py-1 rounded-full text-sm border border-blue-400/40"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 border-t border-gray-600 pt-4 space-y-2">
          <p>📧 <a href={`mailto:${profile.email}`} className="text-blue-400 hover:underline">{profile.email}</a></p>
          <p>💻 <a href={profile.github} target="_blank" className="text-blue-400 hover:underline">GitHub</a></p>
          <p>🔗 LinkedIn: {profile.linkedin}</p>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
