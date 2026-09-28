// Animations réutilisables entre les sections.
// ⚠️ À appeler UNIQUEMENT à l'intérieur d'un bloc gsap.matchMedia(MOTION_OK),
// pour respecter prefers-reduced-motion.
import { gsap } from "./gsap";

/**
 * Fait entrer un avatar depuis le côté de l'écran quand sa section arrive.
 * @param {string|Element} target  l'élément à animer
 * @param {object} options
 *   side    : "left" ou "right" (côté d'où arrive l'avatar)
 *   trigger : l'élément qui déclenche l'animation (en général la section)
 */
export function enterFromSide(target, { side = "left", trigger, start = "top 70%" }) {
  const dir = side === "left" ? -1 : 1;
  return gsap.from(target, {
    xPercent: 70 * dir, // part hors de sa place, du bon côté
    rotate: 8 * dir,    // léger basculement, comme un personnage qui "déboule"
    autoAlpha: 0,
    duration: 1.1,
    ease: "back.out(1.2)", // petit dépassement puis retour : effet vivant
    scrollTrigger: {
      trigger,
      start,
      // joue en entrant, rejoue à l'envers si on remonte au-dessus
      toggleActions: "play none none reverse",
    },
  });
}

/** Trace des chemins SVG (classe .js-draw + pathLength="1") au scroll. */
export function drawOnScroll(targets, { trigger, start = "top 70%", delay = 0 }) {
  return gsap.fromTo(
    targets,
    { strokeDashoffset: 1 },
    {
      strokeDashoffset: 0,
      duration: 0.9,
      delay,
      stagger: 0.1,
      ease: "power1.inOut",
      scrollTrigger: { trigger, start, toggleActions: "play none none reverse" },
    }
  );
}
