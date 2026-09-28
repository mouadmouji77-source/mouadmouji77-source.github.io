// Données personnelles centralisées : on les modifie ici,
// et tous les composants (Hero, Contact...) se mettent à jour.
const BASE = import.meta.env.BASE_URL;

export const profile = {
  firstName: "Mouad",
  lastName: "Mouji",
  role: ["Data Engineer", "BI Developer", "AI & NLP"],
  location: "Rabat, Maroc",
  school: "EMSI Rabat — option MIAGE, promo 2026",
  email: "mouji.mouad.dev@gmail.com",
  linkedin: "https://linkedin.com/in/mouad-mouji",
  github: "https://github.com/mouadmouji77-source",
  cv: `${BASE}assets/CV_Mouad_Mouji.pdf`,
};
