import Hero from "./components/Hero/Hero";
import Band from "./components/Band/Band";
import About from "./components/About/About";
import Experience from "./components/Experience/Experience";
import Projects from "./components/Projects/Projects";
import Skills from "./components/Skills/Skills";
import Certifications from "./components/Certifications/Certifications";

// Composant racine : assemble les sections dans l'ordre de la page.
// Les sections suivantes (Expérience, Projets...) seront
// ajoutées une par une, après validation.
export default function App() {
  return (
    <main>
      <Hero />

      {/* Séparateur bleu marine légèrement incliné */}
      <Band items={["Data & BI", "Data Engineering", "AI & NLP", "Business Intelligence"]} tilt={-1.5} />

      <About />

      <Experience />

      <Projects />

      {/* Bandeau marine qui introduit les compétences (défile dans l'autre sens) */}
      <Band items={["Skills", "Power BI", "SQL", "Python", "RAG", "PostgreSQL", "Cloud"]} tilt={1.5} reverse />

      <Skills />

      <Certifications />

      {/* Espace provisoire pour tester les animations au scroll */}
      <div style={{ height: "60vh" }} />
    </main>
  );
}
