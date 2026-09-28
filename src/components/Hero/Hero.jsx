import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../../lib/gsap";
import { profile } from "../../data/profile";
import Avatar from "../Avatar/Avatar";
import Doodles from "./Doodles";
import s from "./Hero.module.css";

// Le mot géant, découpé en lettres pour l'animation lettre par lettre
const BIG_WORD = "PORTFOLIO".split("");

export default function Hero() {
  // Référence vers la section : sert de "scope" à GSAP (les sélecteurs
  // comme ".js-letter" ne cherchent QUE dans le Hero)
  const root = useRef(null);

  useGSAP(
    () => {
      // gsap.matchMedia : ce bloc ne s'exécute que si l'utilisateur
      // n'a PAS activé "réduire les animations". Sinon, rien ne bouge
      // et le CSS affiche directement l'état final (tout visible, en couleur).
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        /* ---------- 1. Timeline d'entrée ---------- */
        // Créée en pause : on attend que le croquis soit chargé pour que le
        // visiteur voie bien le passage croquis → couleur (sinon, sur une
        // connexion lente, l'animation se jouerait sur des images vides).
        const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

        // a) Le croquis apparaît en premier
        tl.from(".js-sketch", { autoAlpha: 0, y: 30, duration: 0.6 }, 0)

          // b) Coloriage progressif : on anime la variable CSS --reveal
          //    qui pilote un masque dégradé sur le calque couleur
          //    (de bas en haut, bord doux). Durée totale : ~2 s.
          .fromTo(
            ".js-color",
            { "--reveal": "-25%" },
            { "--reveal": "125%", duration: 1.8, ease: "power1.inOut" },
            0.2
          )

          // c) "PORTFOLIO" apparaît lettre par lettre
          .from(
            ".js-letter",
            { yPercent: 60, rotate: 6, autoAlpha: 0, duration: 0.8, stagger: 0.07 },
            0.05
          )

          // d) Les doodles se dessinent (stroke-dashoffset 1 → 0)
          .fromTo(
            ".js-draw",
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 0.9, stagger: 0.05, ease: "power1.inOut" },
            0.7
          )
          // ... puis le texte des étiquettes apparaît
          .from(".js-tag-text", { autoAlpha: 0, duration: 0.4, stagger: 0.12 }, 1.4)

          // e) Le bloc de présentation monte en fondu, élément par élément
          .from(".js-intro", { autoAlpha: 0, y: 24, duration: 0.7, stagger: 0.09 }, 0.6);

        // Lancement : dès que le croquis est chargé, ou après 1,2 s au maximum
        // (on ne retarde jamais trop l'affichage : c'est l'image LCP de la page)
        const sketch = root.current.querySelector(".js-sketch img");
        const start = () => tl.paused() && tl.play();
        if (!sketch || sketch.complete) {
          start();
        } else {
          sketch.addEventListener("load", start, { once: true });
          sketch.addEventListener("error", start, { once: true }); // bascule .webp → .png
          gsap.delayedCall(1.2, start);
        }

        /* ---------- 2. Parallaxe au scroll ---------- */
        // Le mot géant glisse vers la gauche pendant qu'on quitte le Hero...
        gsap.to(".js-bigword", {
          xPercent: -10,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        // ... et l'avatar monte un peu plus vite que la page (effet de profondeur)
        gsap.to(".js-stage", {
          yPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="hero" ref={root} className={s.hero}>
      {/* Petite ligne éditoriale en haut de page */}
      <div className={s.meta}>
        <span>
          {profile.firstName} {profile.lastName}
        </span>
        <span className={s.metaRight}>
          <span className={s.dot} aria-hidden="true" />
          Disponible — 2026
        </span>
      </div>

      {/* Mot géant décoratif (le vrai titre de la page est le h1 plus bas) */}
      <div className={`${s.bigWord} js-bigword`} aria-hidden="true">
        {BIG_WORD.map((letter, i) => (
          <span key={i} className={`${s.letter} js-letter`}>
            {letter}
          </span>
        ))}
      </div>

      {/* Scène de l'avatar : 2 calques superposés + doodles autour */}
      <div className={`${s.stage} js-stage`}>
        <div className={s.avatarStack}>
          {/* Calque 1 : le croquis au crayon (dessous) */}
          <div className={`${s.layer} js-sketch`}>
            <Avatar name="hero-sketch" alt="Illustration de Mouad Mouji" eager />
          </div>
          {/* Calque 2 : la version couleur, révélée par un masque animé */}
          <div className={`${s.layer} ${s.colorLayer} js-color`}>
            <Avatar name="hero-color" alt="" tone="color" eager />
          </div>
        </div>
        <Doodles />
      </div>

      {/* Bloc de présentation */}
      <div className={s.intro}>
        <p className={`${s.kicker} js-intro`}>
          Ingénieur Data & BI — {profile.location}
        </p>

        <h1 className={`${s.title} js-intro`}>
          {/* Le mot manuscrit rouge de la section */}
          <span className={s.hi}>Hi,</span>
          <span className={s.titleLine}>
            I'm <span className={s.highlight}>{profile.firstName} {profile.lastName}</span>
          </span>
        </h1>

        <p className={`${s.subtitle} js-intro`}>
          {profile.role.map((r, i) => (
            <span key={r}>
              {i > 0 && <span className={s.sep} aria-hidden="true">|</span>}
              {r}
            </span>
          ))}
        </p>

        <p className={`${s.lead} js-intro`}>
          Jeune ingénieur ({profile.school}), je transforme des données brutes en
          décisions : pipelines, tableaux de bord et assistants IA. Je recherche un
          premier poste en BI, Data Engineering ou développement logiciel.
        </p>

        <div className={`${s.actions} js-intro`}>
          <a className={`${s.btn} ${s.btnPrimary}`} href="#projects">
            Voir mes projets
          </a>
          <a className={s.btn} href={profile.cv} download>
            Télécharger mon CV
          </a>
          <a className={s.btn} href="#contact">
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}
