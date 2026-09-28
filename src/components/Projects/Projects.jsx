import { useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "../../lib/gsap";
import { enterFromSide } from "../../lib/animations";
import { projects, categories } from "../../data/projects";
import { cablePath } from "./cables";
import SectionTitle from "../SectionTitle/SectionTitle";
import Avatar from "../Avatar/Avatar";
import ProjectCard from "./ProjectCard";
import s from "./Projects.module.css";

// Position des mains dans l'illustration pulling.png (1024×1536), en fraction
// de l'image (0,0 = coin haut-gauche) : le cœur du poing avant, ≈ (797 px, 497 px).
// La boîte de l'avatar a exactement le même ratio 2:3 que l'image, donc ces
// fractions tombent pile sur les mains. L'avatar est au-dessus du calque des
// câbles : le départ du câble est caché par les doigts, comme s'il le tenait.
const HANDS = { x: 0.78, y: 0.32 };

export default function Projects() {
  const root = useRef(null);
  const workArea = useRef(null);
  const [filter, setFilter] = useState("all");
  const isFirstRender = useRef(true);

  // Projets visibles selon le filtre actif
  const visible = useMemo(
    () => projects.filter((p) => filter === "all" || p.category === filter),
    [filter]
  );

  /* ---------- Entrée de l'avatar (une seule fois, indépendante du filtre) ---------- */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        enterFromSide(".js-pull-avatar", { side: "left", trigger: workArea.current, start: "top 75%" });
      });
    },
    { scope: root }
  );

  /* ---------- Cartes tirées par les câbles (recréé à chaque changement de filtre) ---------- */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: MOTION_OK,
          desktop: "(min-width: 821px)",
        },
        (ctx) => {
          const { motion, desktop } = ctx.conditions;
          const items = gsap.utils.toArray(".js-pull", workArea.current);

          // Petit fondu quand on change de filtre (pas au premier affichage)
          if (motion && !isFirstRender.current) {
            gsap.from(".js-card", {
              autoAlpha: 0,
              y: 24,
              duration: 0.5,
              stagger: 0.06,
              ease: "power2.out",
              clearProps: "all", // rend la main au CSS (effet de survol)
            });
          }

          if (!motion) return; // mouvement réduit : cartes statiques, pas de câbles

          if (!desktop) {
            // Mobile : entrée simple par le bas, sans câbles (écran trop étroit)
            items.forEach((li) =>
              gsap.from(li, {
                y: 50,
                autoAlpha: 0,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: { trigger: li, start: "top 90%", toggleActions: "play none none reverse" },
              })
            );
            return;
          }

          /* --- Desktop : chaque carte arrive de la droite, "tirée" au scroll --- */
          const tweens = items.map((li) =>
            gsap.fromTo(
              li,
              { x: () => window.innerWidth * 0.35, rotate: 3 },
              {
                x: 0,
                rotate: 0,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: li,
                  start: "top bottom", // la carte commence à être tirée quand elle entre à l'écran
                  end: "top 45%",      // ... et elle est en place à 45 % de la hauteur
                  scrub: 0.8,          // suit le scroll avec un léger lissage
                  invalidateOnRefresh: true,
                },
              }
            )
          );

          /* --- Mise à jour des câbles à chaque image (60 fps) --- */
          const area = workArea.current;
          const svg = area.querySelector(".js-cables");
          const avatar = area.querySelector(".js-pull-avatar");

          const tick = () => {
            const a = area.getBoundingClientRect();
            svg.setAttribute("viewBox", `0 0 ${a.width} ${a.height}`);

            // Point d'attache : les mains de l'avatar (coordonnées relatives à la zone)
            const av = avatar.getBoundingClientRect();
            const hx = av.left - a.left + av.width * HANDS.x;
            const hy = av.top - a.top + av.height * HANDS.y;
            const time = gsap.ticker.time;

            items.forEach((li, i) => {
              const cable = svg.querySelector(`[data-cable="${li.dataset.id}"]`);
              if (!cable) return;

              const progress = tweens[i].progress(); // 0 = loin, 1 = arrivée
              const r = li.getBoundingClientRect();
              // Prise = bord gauche de la carte, à 7rem du haut max (hauteur du visuel)
              const px = r.left - a.left;
              const py = r.top - a.top + Math.min(r.height / 2, 110);

              // Visible pendant la traction, s'efface sur les 20 derniers %
              const opacity = progress <= 0.001 ? 0 : 1 - gsap.utils.clamp(0, 1, (progress - 0.8) / 0.2);
              cable.style.opacity = opacity;
              if (opacity === 0) return;

              const amp = 4 + 28 * (1 - progress); // lâche → tendu
              cable.querySelector("path").setAttribute("d", cablePath(hx, hy, px, py, amp, time));
              const plug = cable.querySelector("circle");
              plug.setAttribute("cx", px);
              plug.setAttribute("cy", py);
            });
          };

          // On ne calcule les câbles que lorsque la zone est à l'écran (économie de CPU)
          let running = false;
          const start = () => !running && (gsap.ticker.add(tick), (running = true));
          const stop = () => running && (gsap.ticker.remove(tick), (running = false));

          const watcher = ScrollTrigger.create({
            trigger: area,
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => (self.isActive ? start() : stop()),
          });
          if (watcher.isActive) start();

          // Nettoyage quand le filtre change ou que la media query ne correspond plus
          return () => stop();
        }
      );

      // La hauteur de la section a pu changer : on recalcule les sections suivantes
      ScrollTrigger.refresh();
      isFirstRender.current = false;
    },
    { scope: root, dependencies: [filter], revertOnUpdate: true }
  );

  return (
    <section id="projects" ref={root} className="section" aria-labelledby="projects-title">
      <SectionTitle id="projects-title" ghost="WORK" kicker="03 — Projets" title="My work" hand="Selected projects" />

      {/* Filtres par catégorie */}
      <div className={s.filters} role="group" aria-label="Filtrer les projets">
        {categories.map((c) => {
          const count = c.id === "all" ? projects.length : projects.filter((p) => p.category === c.id).length;
          return (
            <button
              key={c.id}
              type="button"
              className={s.filter}
              aria-pressed={filter === c.id}
              onClick={() => setFilter(c.id)}
            >
              {c.label} <span className={s.count}>{count}</span>
            </button>
          );
        })}
      </div>

      <div ref={workArea} className={s.workArea}>
        {/* Calque SVG des câbles, par-dessus toute la zone */}
        <svg className={`${s.cables} js-cables`} aria-hidden="true">
          {visible.map((p) => (
            <g key={p.id} data-cable={p.id} style={{ opacity: 0 }}>
              <path className={s.cable} />
              <circle className={s.plug} r="5" />
            </g>
          ))}
        </svg>

        {/* Colonne de gauche : l'avatar qui tire, collant pendant le scroll */}
        <div className={s.rail}>
          <div className={`${s.pullAvatar} js-pull-avatar`}>
            <Avatar name="pulling" alt="Mouad tire des câbles de données qui ramènent ses projets" />
          </div>
        </div>

        {/* Liste des projets */}
        <ul className={s.list}>
          {visible.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </ul>
      </div>
    </section>
  );
}
