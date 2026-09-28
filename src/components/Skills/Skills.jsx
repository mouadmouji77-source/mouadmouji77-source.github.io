import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../../lib/gsap";
import { skills } from "../../data/skills";
import SectionTitle from "../SectionTitle/SectionTitle";
import ToolIcon from "../ToolIcon/ToolIcon";
import s from "./Skills.module.css";

export default function Skills() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Les cartes sont "distribuées" comme des fiches : elles arrivent
        // du bas, un peu tournées, puis se posent droites.
        gsap.from(".js-skill", {
          y: 80,
          rotate: (i) => (i % 2 ? 5 : -5), // alterne l'inclinaison de départ
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: ".js-skills-grid", start: "top 80%", toggleActions: "play none none reverse" },
        });

        // Puis les pastilles de chaque carte apparaissent en cascade
        gsap.utils.toArray(".js-skill").forEach((card, i) => {
          gsap.from(card.querySelectorAll(".js-chip"), {
            scale: 0.4,
            autoAlpha: 0,
            duration: 0.35,
            stagger: 0.04,
            delay: 0.35 + i * 0.1,
            ease: "back.out(2.5)",
            scrollTrigger: { trigger: ".js-skills-grid", start: "top 80%", toggleActions: "play none none reverse" },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="skills" ref={root} className="section" aria-labelledby="skills-title">
      <SectionTitle id="skills-title" ghost="SKILLS" kicker="04 — Compétences" title="Skills" hand="what I use" />

      <ul className={`${s.grid} js-skills-grid`}>
        {skills.map((cat, i) => (
          <li key={cat.id} className={`${s.card} ${s[cat.id]} js-skill`}>
            {/* En-tête bleu marine de la fiche */}
            <div className={s.head}>
              <span className={s.num}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={s.title}>{cat.title}</h3>
              <ToolIcon icon={cat.icon} className={s.icon} />
            </div>

            <ul className={s.chips}>
              {cat.items.map((item) => (
                <li key={item} className={`${s.chip} js-chip`}>
                  {item}
                </li>
              ))}
            </ul>

            {cat.extra && (
              <>
                <p className={s.extraLabel}>{cat.extra.label}</p>
                <ul className={s.chips}>
                  {cat.extra.items.map((item) => (
                    <li key={item} className={`${s.chip} ${s.chipOutline} js-chip`}>
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
