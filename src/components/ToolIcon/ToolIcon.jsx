/*
 * Pictogrammes des outils, dessinés en SVG "trait" (comme les doodles)
 * plutôt que les logos officiels : cohérent avec le style carnet de croquis,
 * aucun fichier externe à charger, et pas de souci de droits sur les logos.
 * Réutilisés dans "À propos" et plus tard dans "Compétences".
 */
const ICONS = {
  // Diagramme en barres → Power BI
  bars: (
    <>
      <rect x="5" y="16" width="5" height="10" rx="1" />
      <rect x="13.5" y="10" width="5" height="16" rx="1" />
      <rect x="22" y="5" width="5" height="21" rx="1" />
    </>
  ),
  // Étincelles → IA
  spark: (
    <>
      <path d="M13 4c.8 5.2 2.8 7.2 8 8-5.2.8-7.2 2.8-8 8-.8-5.2-2.8-7.2-8-8 5.2-.8 7.2-2.8 8-8z" />
      <path d="M24 18c.4 2.4 1.6 3.6 4 4-2.4.4-3.6 1.6-4 4-.4-2.4-1.6-3.6-4-4 2.4-.4 3.6-1.6 4-4z" />
    </>
  ),
  // Cylindre → bases de données
  database: (
    <>
      <ellipse cx="16" cy="8" rx="10" ry="3.5" />
      <path d="M6 8v16c0 2 4.5 3.5 10 3.5s10-1.5 10-3.5V8" />
      <path d="M6 16c0 2 4.5 3.5 10 3.5s10-1.5 10-3.5" />
    </>
  ),
  // Terminal → Python
  terminal: (
    <>
      <rect x="3" y="6" width="26" height="20" rx="3" />
      <path d="M9 13l4 3-4 3M16 20h7" />
    </>
  ),
  // Éclair → FastAPI (rapide)
  bolt: <path d="M18 3L7 18h8l-2 11 12-16h-8z" />,
  // Nuage → AWS
  cloud: <path d="M9 24a6 6 0 0 1-.5-12A8 8 0 0 1 24 11a6.5 6.5 0 0 1-.5 13z" />,
  // Tasse fumante → Java
  cup: (
    <>
      <path d="M6 13h16v7a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6z" />
      <path d="M22 15h2.5a3 3 0 0 1 0 6H22" />
      <path d="M11 4c-1.2 2 1.2 3 0 5M16 4c-1.2 2 1.2 3 0 5" />
    </>
  ),
  // Capsule → Oracle
  capsule: <rect x="3" y="10" width="26" height="12" rx="6" />,
  // Deux voiles → Azure
  peaks: <path d="M14 5L4 26h8l10-15zM17 14l4 12h7z" />,
  // Branches → Git
  branch: (
    <>
      <circle cx="9" cy="7" r="2.5" />
      <circle cx="9" cy="25" r="2.5" />
      <circle cx="23" cy="11" r="2.5" />
      <path d="M9 9.5v13M23 13.5c0 6-14 4-14 9" />
    </>
  ),
};

export default function ToolIcon({ icon, className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[icon]}
    </svg>
  );
}
