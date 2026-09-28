// Expériences affichées dans la timeline (de la plus récente à la plus ancienne).
// Source : CV (public/assets/CV_Mouad_Mouji.pdf) — intitulés et missions repris tels quels.
//
// Si un champ vaut `null`, il s'affiche dans un encadré pointillé "À compléter".
//   role     : intitulé exact du poste
//   location : service / ville
//   missions : phrases courtes, commençant par un verbe d'action
//   stack    : technologies utilisées pendant le stage
export const experience = [
  {
    company: "Al Barid Bank",
    type: "Projet de fin d'études",
    period: "Fév. — Juin 2026",
    role: "Stagiaire Ingénieur",
    location: "Département Data & BI, Rabat",
    missions: [
      "Conçu et développé BI Assistant IA, un outil décisionnel qui traduit des questions en langage naturel en requêtes SQL (NLP-to-SQL), fiabilisé par un pipeline RAG appliquant les règles de gestion métier.",
      "Développé le backend avec FastAPI et intégré l'API Claude (LLM) pour la génération automatique de requêtes SQL.",
      "Mis en place une base PostgreSQL avec l'extension pgvector et une recherche vectorielle sémantique (sentence-transformers) pour indexer la base de connaissances métier.",
      "Développé un tableau de bord interactif (HTML/JavaScript, Chart.js) avec gestion de rôles (Analyste, Manager, Administrateur), traçabilité complète des requêtes et espace d'administration.",
    ],
    stack: [
      "Python",
      "FastAPI",
      "API Claude",
      "RAG",
      "PostgreSQL",
      "pgvector",
      "sentence-transformers",
      "JavaScript",
      "Chart.js",
    ],
    current: true, // expérience mise en avant (point rouge)
  },
  {
    company: "DYN IT Maroc",
    type: "Stage",
    period: "Juil. — Sept. 2025",
    role: "Stagiaire Data & Cloud",
    location: "Rabat",
    missions: [
      "Conçu et déployé une solution décisionnelle cloud sur AWS (RDS, IAM, VPC) : base PostgreSQL, ETL (Power Query), modélisation en étoile et tableau de bord Power BI pour le suivi du budget, des délais, des ressources et des risques.",
    ],
    stack: ["AWS (RDS, IAM, VPC)", "PostgreSQL", "Power Query", "ETL", "Modélisation en étoile", "Power BI", "DAX"],
  },
  {
    company: "TURNSCAL",
    type: "Stage",
    period: "Juil. — Sept. 2024",
    role: "Stagiaire Développeur Web",
    location: "Rabat",
    missions: [
      "Développé un outil d'automatisation des publications Instagram (Django, Python) avec intégration de l'API Graph pour le traitement automatisé des données.",
      "Conçu l'interface utilisateur avec HTML, CSS, Bootstrap et SQLite.",
    ],
    stack: ["Python", "Django", "API Graph", "HTML/CSS", "Bootstrap", "SQLite"],
  },
];
