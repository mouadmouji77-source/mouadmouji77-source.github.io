// Compétences regroupées par catégorie.
// Règle : chaque élément est justifié par un projet, une certification
// ou une expérience (pas de niveau en % inventé).
//   icon : pictogramme de components/ToolIcon
//   extra : ligne secondaire facultative (ex. frameworks)
export const skills = [
  {
    id: "bi",
    title: "BI & Data",
    icon: "bars",
    items: [
      "Power BI",
      "DAX",
      "Power Query",
      "SQL",
      "ETL",
      "Data warehouse",
      "Modélisation en étoile",
      "Chart.js",
    ],
  },
  {
    id: "ai",
    title: "IA & NLP",
    icon: "spark",
    items: ["NLP-to-SQL", "RAG", "API Claude", "Embeddings", "sentence-transformers", "Recherche vectorielle"],
  },
  {
    id: "cloud",
    title: "Cloud",
    icon: "cloud",
    items: ["AWS", "Oracle Cloud (OCI)", "Azure"],
    extra: { label: "DevOps & outils", items: ["Docker", "Kubernetes", "Git", "Linux / Unix"] },
  },
  {
    id: "lang",
    title: "Langages",
    icon: "terminal",
    items: ["Python", "Java", "SQL", "JavaScript", "HTML / CSS"],
    extra: { label: "Frameworks", items: ["FastAPI", "Django", "Spring Boot", "Spring Cloud", ".NET", "React", "Android SDK", "Java Swing"] },
  },
  {
    id: "db",
    title: "Bases de données",
    icon: "database",
    items: ["PostgreSQL", "pgvector", "Oracle Database", "SQL Server", "MySQL", "SQLite"],
  },
];
