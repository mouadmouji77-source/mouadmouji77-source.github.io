import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../../lib/gsap";
import { enterFromSide, drawOnScroll } from "../../lib/animations";
import { profile } from "../../data/profile";
import { tools } from "../../data/tools";
import SectionTitle from "../SectionTitle/SectionTitle";
import Avatar from "../Avatar/Avatar";
import ToolIcon from "../ToolIcon/ToolIcon";
import s from "./About.module.css";

// Quelques infos clés affichées sous forme de fiche
const FACTS = [
  { label: "Basé à", value: profile.location },
  { label: "Formation", value: "EMSI Rabat — MIAGE, 2026" },
  { label: "Je cherche", value: "BI · Data Engineering · Dev" },
];

export default function About() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // L'avatar "pointing" entre par la GAUCHE (il pointe vers le texte, à droite)
        enterFromSide(".js-about-avatar", { side: "left", trigger: root.current });

        // La flèche manuscrite se trace juste après l'arrivée de l'avatar
        drawOnScroll(".js-draw", { trigger: root.current, delay: 0.6 });

        // Les paragraphes montent en fondu
        gsap.from(".js-about-text", {
          y: 30,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".js-about-body", start: "top 75%", toggleActions: "play none none reverse" },
        });

        // Les tuiles de la barre d'outils "tombent" une à une
        gsap.from(".js-tool", {
          y: -20,
          scale: 0.6,
          autoAlpha: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "back.out(2)",
          scrollTrigger: { trigger: ".js-toolbar", start: "top 85%", toggleActions: "play none none reverse" },
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="about" ref={root} className="section" aria-labelledby="about-title">
      <SectionTitle id="about-title" ghost="ABOUT" kicker="01 — À propos" title="About me" hand="nice to meet you!" />

      <div className={s.grid}>
        {/* Colonne gauche : l'avatar qui pointe vers le texte */}
        <div className={s.avatarCol}>
          <div className={`${s.avatar} js-about-avatar`}>
            <Avatar name="pointing" alt="Mouad pointe du doigt vers sa présentation" />
          </div>
          {/* Petite flèche dessinée entre le doigt et le texte */}
          <svg className={s.arrow} viewBox="0 0 110 60" aria-hidden="true">
            <path className="js-draw" pathLength="1" d="M4 40 C 30 12, 64 8, 96 26" />
            <path className="js-draw" pathLength="1" d="M84 16 L97 26.5 L82 32" />
          </svg>
        </div>

        {/* Colonne droite : texte + fiche + barre d'outils */}
        <div className={`${s.body} js-about-body`}>
          <p className={`${s.lead} js-about-text`}>
            Je suis Mouad, ingénieur <strong>Data & Business Intelligence</strong> diplômé
            de l'EMSI Rabat (option MIAGE, promo 2026).
          </p>
          <p className="js-about-text">
            Ce qui me plaît, c'est toute la chaîne de la donnée : la modéliser dans
            PostgreSQL, la transformer en tableaux de bord Power BI, puis la rendre
            accessible en langage naturel grâce à l'IA. Pour mon PFE chez Al Barid Bank,
            j'ai conçu un assistant BI qui traduit des questions en requêtes SQL
            (NLP-to-SQL, RAG).
          </p>
          <p className="js-about-text">
            Je cherche aujourd'hui un premier poste où je peux livrer des outils
            concrets, utilisés au quotidien.
          </p>

          {/* Fiche d'identité rapide */}
          <dl className={`${s.facts} js-about-text`}>
            {FACTS.map((f) => (
              <div key={f.label} className={s.fact}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>

          {/* Barre d'outils façon logiciel de dessin */}
          <div className={`${s.toolbar} js-toolbar`}>
            <div className={s.toolbarHead}>
              <span className={s.grip} aria-hidden="true" />
              <span>Toolbox</span>
              <span className={s.count}>{tools.length}</span>
            </div>
            <ul className={s.tools} aria-label="Outils que j'utilise">
              {tools.map((t) => (
                <li key={t.name} className={`${s.tool} js-tool`}>
                  <ToolIcon icon={t.icon} className={s.toolIcon} />
                  <span className={s.toolName}>{t.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
