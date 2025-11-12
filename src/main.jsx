import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.jsx"; // 🗑️ Hapus karena tidak digunakan
import RestAPI from "./RestAPI.jsx";

console.log("✅ React is running");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Sekarang hanya RestAPI yang ada */}
    <RestAPI />
  </StrictMode>
);