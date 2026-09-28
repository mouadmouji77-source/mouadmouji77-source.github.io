import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../../lib/gsap";
import s from "./SectionTitle.module.css";

/**
 * En-tête de section réutilisable :
 *   - un mot ÉNORME gris très pâle derrière (ghost) qui glisse au scroll ;
 *   - un sur-titre rouge en majuscules (kicker) ;
 *   - le titre principal en Anton ;
 *   - un mot manuscrit rouge (hand), un seul par section.
 *
 * @param {string} ghost   mot géant d'arrière-plan (ex. "ABOUT")
 * @param {string} kicker  sur-titre (ex. "01 — À propos")
 * @param {string} title   titre visible (h2)
 * @param {string} hand    mot manuscrit (optionnel)
 * @param {"left"|"center"} align
 */
export default function SectionTitle({ ghost, kicker, title, hand, align = "left", id }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Parallaxe horizontale du mot géant : il traverse pendant
        // tout le temps où l'en-tête est visible à l'écran (scrub = lié au scroll)
        gsap.fromTo(
          ".js-ghost",
          { xPercent: 8 },
          {
            xPercent: -22,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
          }
        );

        // Apparition du titre : kicker, titre puis mot manuscrit
        gsap.from(".js-title-part", {
          y: 40,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 80%", toggleActions: "play none none reverse" },
        });
      });
    },
    { scope: root }
  );

  return (
    <header ref={root} className={`${s.head} ${align === "center" ? s.center : ""}`}>
      <span className={`${s.ghost} js-ghost`} aria-hidden="true">
        {ghost}
      </span>
      <p className={`${s.kicker} js-title-part`}>{kicker}</p>
      <h2 id={id} className={`${s.title} js-title-part`}>
        {title}
      </h2>
      {hand && <span className={`${s.hand} js-title-part`}>{hand}</span>}
    </header>
  );
}
