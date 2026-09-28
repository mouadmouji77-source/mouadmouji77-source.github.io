import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../../lib/gsap";
import { enterFromSide } from "../../lib/animations";
import { experience } from "../../data/experience";
import SectionTitle from "../SectionTitle/SectionTitle";
import Avatar from "../Avatar/Avatar";
import s from "./Experience.module.css";

/* Encadré pointillé pour une information manquante (jamais inventée) */
function Todo({ children }) {
  return <span className={s.todo}>À compléter : {children}</span>;
}

export default function Experience() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // L'avatar arrive par la DROITE (l'À propos arrivait par la gauche : on alterne)
        enterFromSide(".js-exp-avatar", { side: "right", trigger: root.current });

        // La ligne de la timeline se "dessine" en suivant le scroll (scrub)
        gsap.fromTo(
          ".js-line",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: ".js-timeline", start: "top 70%", end: "bottom 60%", scrub: true },
          }
        );

        // Chaque étape : le point grossit puis la carte glisse depuis la droite
        gsap.utils.toArray(".js-step").forEach((step) => {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: step, start: "top 78%", toggleActions: "play none none reverse" },
          });
          tl.from(step.querySelector(".js-dot"), { scale: 0, duration: 0.4, ease: "back.out(3)" }).from(
            step.querySelector(".js-card"),
            { x: 60, autoAlpha: 0, duration: 0.7, ease: "power3.out" },
            "-=0.15"
          );
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="experience" ref={root} className="section" aria-labelledby="experience-title">
      <SectionTitle
        id="experience-title"
        ghost="EXPERIENCE"
        kicker="02 — Expérience"
        title="Experience"
        hand="where I learned"
      />

      <div className={s.layout}>
        {/* --- Timeline --- */}
        <ol className={`${s.timeline} js-timeline`}>
          {/* La ligne verticale (animée séparément de la bordure) */}
          <span className={`${s.line} js-line`} aria-hidden="true" />

          {experience.map((exp) => (
            <li key={exp.company} className={`${s.step} js-step`}>
              <span className={`${s.dot} ${exp.current ? s.dotCurrent : ""} js-dot`} aria-hidden="true" />

              <article className={`${s.card} js-card`}>
                <header className={s.cardHead}>
                  <span className={s.period}>{exp.period}</span>
                  <span className={s.type}>{exp.type}</span>
                </header>

                <h3 className={s.company}>{exp.company}</h3>
                <p className={s.role}>
                  {exp.role ?? <Todo>intitulé du poste</Todo>}
                  {exp.location && <span className={s.location}> · {exp.location}</span>}
                </p>

                {exp.missions ? (
                  <ul className={s.missions}>
                    {exp.missions.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                ) : (
                  <p>
                    <Todo>2 ou 3 missions</Todo>
                  </p>
                )}

                {exp.stack ? (
                  <ul className={s.stack} aria-label="Technologies">
                    {exp.stack.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                ) : (
                  <Todo>technologies</Todo>
                )}
              </article>
            </li>
          ))}
        </ol>

        {/* --- Avatar : reste visible (sticky) pendant qu'on parcourt la timeline --- */}
        <div className={s.avatarCol}>
          <div className={`${s.avatar} js-exp-avatar`}>
            <Avatar name="hero-sketch" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
