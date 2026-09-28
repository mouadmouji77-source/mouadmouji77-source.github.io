// Projets affichés dans "MY WORK".
// Contenu rédigé après lecture du README ET du code de chaque dépôt.
//
// category : "data" | "web" | "mobile" | "desktop"  (utilisé par les filtres)
// visual   : "browser" | "phone" | "desktop"         (type de maquette CSS)
// todo     : information à confirmer, affichée en pointillés rouges
const GH = "https://github.com/mouadmouji77-source";

export const categories = [
  { id: "all", label: "Tous" },
  { id: "data", label: "Data/BI" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "desktop", label: "Desktop" },
];

export const projects = [
  {
    id: "bi",
    featured: true, // grande carte vedette avec son mini-hero
    title: "BI Assistant IA",
    label: "Projet de fin d'études",
    category: "data",
    visual: "bi",
    description:
      "Un assistant BI qui permet de poser des questions métier en français et d'obtenir la requête SQL, le tableau de résultats et le graphique correspondants. Une couche RAG enrichit chaque question avec le glossaire métier et les requêtes déjà validées.",
    highlights: [
      "Pipeline NL→SQL avec l'API Claude : schéma + contexte RAG + question → SQL en lecture seule, validé avant exécution (SELECT uniquement, LIMIT imposé).",
      "RAG sur PostgreSQL + pgvector avec des embeddings multilingues locaux ; chaque requête réussie est réindexée comme exemple pour les questions suivantes.",
      "4 rôles (analyste, manager, direction, admin) avec authentification JWT et tableaux de bord adaptés à chacun.",
    ],
    stack: ["FastAPI", "PostgreSQL", "pgvector", "API Claude", "sentence-transformers", "Chart.js", "JWT"],
    repo: `${GH}/bi`,
  },
  {
    id: "insta_poster",
    title: "Insta Poster",
    category: "web",
    visual: "browser",
    description:
      "Application web Django pour programmer la publication de posts Instagram. On saisit l'image, la légende, la date et l'heure : le post part automatiquement au moment prévu.",
    highlights: [
      "Publication en 2 étapes via l'API Instagram Graph : création du média, puis publication.",
      "Planification des envois avec APScheduler et vérification du token d'accès avant chaque programmation.",
      "Suivi des posts programmés (modifier, supprimer, statut publié) et espace admin de gestion des utilisateurs.",
    ],
    stack: ["Python", "Django", "Instagram Graph API", "APScheduler"],
    repo: `${GH}/insta_poster`,
  },
  {
    id: "Artisant_management",
    title: "Artisan Management",
    category: "web",
    visual: "browser",
    description:
      "Plateforme web Django qui met en relation des clients et des artisans (plomberie, menuiserie, informatique...). Les artisans publient leurs services, les clients les réservent sur un créneau et laissent un avis.",
    highlights: [
      "Deux espaces distincts, client et artisan, chacun avec son tableau de bord.",
      "Cycle complet d'une demande : réservation d'un créneau, acceptation ou refus par l'artisan, suivi du statut.",
      "Avis clients notés de 1 à 5, avec une note moyenne calculée par service.",
    ],
    stack: ["Python", "Django", "Pillow", "HTML/CSS"],
    repo: `${GH}/Artisant_management`,
  },
  {
    id: "BudgetApp_Android_Flosino",
    title: "Flosino",
    category: "mobile",
    visual: "phone",
    description:
      "Application Android native pour suivre ses revenus et ses dépenses au quotidien. Elle calcule le solde en temps réel et présente des statistiques par catégorie.",
    highlights: [
      "Ajout de transactions (revenus et dépenses) et historique en liste avec RecyclerView.",
      "Stockage local des données avec SQLite (SQLiteOpenHelper).",
      "Écran de statistiques par catégorie et interface Material Design.",
    ],
    stack: ["Java", "Android SDK", "SQLite", "Material Design"],
    repo: `${GH}/BudgetApp_Android_Flosino`,
  },
  {
    id: "edugo_app",
    title: "EduGo",
    category: "mobile",
    visual: "phone",
    description:
      "Application Flutter d'apprentissage assistée par IA : à partir d'un cours ou d'un PDF, elle génère des résumés, des quiz, des examens et des cartes mentales.",
    highlights: [
      "Génération de contenu par IA (Groq) via des Firebase Cloud Functions.",
      "Architecture feature-first avec Riverpod (état) et GoRouter (navigation).",
      "Extraction de PDF, synthèse vocale et accès hors ligne grâce à SQLite.",
    ],
    stack: ["Flutter", "Dart", "Firebase", "Riverpod", "Groq AI"],
    repo: `${GH}/edugo_app`,
    // Le README cite un autre auteur : projet d'équipe ? À confirmer avant publication.
    todo: "ton rôle dans ce projet (le README cite un autre auteur)",
  },
  {
    id: "Library_System_Management",
    title: "Library System",
    category: "desktop",
    visual: "desktop",
    description:
      "Application de bureau Java Swing pour gérer une bibliothèque : livres, membres, emprunts et personnel. Elle propose aussi un écran de rapports et de statistiques.",
    highlights: [
      "Architecture MVC (modèles, vues, contrôleurs) avec des exceptions métier dédiées.",
      "Trois profils d'utilisateurs : administrateur, bibliothécaire et membre.",
      "Persistance des données en fichiers CSV et tests unitaires JUnit.",
    ],
    stack: ["Java", "Swing", "JUnit", "CSV"],
    repo: `${GH}/Library_System_Management`,
  },
];
