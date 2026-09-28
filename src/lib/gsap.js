// Enregistrement central de GSAP et de ses plugins.
// Chaque composant importe gsap depuis ce fichier : on est sûr que
// ScrollTrigger est enregistré une seule fois, avant toute animation.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Requête média réutilisée partout : les animations ne tournent
// QUE si l'utilisateur n'a pas demandé à réduire les mouvements.
// Dans le cas contraire, le CSS affiche directement l'état final.
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, useGSAP };
