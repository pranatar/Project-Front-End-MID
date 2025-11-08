import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import RestAPI from "./RestAPI.jsx";

console.log("✅ React is running");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <RestAPI />
  </StrictMode>
);

