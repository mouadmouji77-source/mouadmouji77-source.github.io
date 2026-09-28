// Point d'entrée de l'application React
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Styles globaux : variables de couleur, polices, grain de papier
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
