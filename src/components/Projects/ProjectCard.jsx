import ProjectVisual from "./ProjectVisual";
import s from "./Projects.module.css";

const CATEGORY_LABEL = { data: "Data / BI", web: "Web", mobile: "Mobile", desktop: "Desktop" };

/**
 * Carte projet. Deux variantes :
 *  - normale : visuel en haut, texte dessous ;
 *  - vedette (project.featured) : "mini-hero" en 2 colonnes, grand titre.
 *
 * Structure en 2 niveaux, pour que les animations ne se marchent pas dessus :
 *  <li .js-pull>          ← déplacé par GSAP (les câbles le ramènent à l'écran)
 *    <article .js-card>   ← zoom + inclinaison au survol (CSS)
 */
export default function ProjectCard({ project }) {
  const p = project;
  const featured = Boolean(p.featured);

  return (
    <li className={`${s.item} ${featured ? s.itemFeatured : ""} js-pull`} data-id={p.id}>
      <article className={`${s.card} ${featured ? s.featured : ""} js-card`}>
        {/* Prise de connexion où vient se brancher le câble de données */}
        <span className={s.port} aria-hidden="true" />

        <ProjectVisual kind={p.visual} title={p.title} slug={p.id} />

        <div className={s.body}>
          <p className={s.cat}>
            {featured ? (
              <>
                <span className={s.star}>★ Projet vedette</span> · {p.label}
              </>
            ) : (
              CATEGORY_LABEL[p.category]
            )}
          </p>

          <h3 className={s.title}>{p.title}</h3>
          <p className={s.desc}>{p.description}</p>

          {/* 3 points forts */}
          <ul className={s.highlights}>
            {p.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>

          {p.todo && <p className={s.todo}>À confirmer : {p.todo}</p>}

          <ul className={s.stack} aria-label="Stack technique">
            {p.stack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <a className={s.link} href={p.repo} target="_blank" rel="noreferrer">
            Voir le code sur GitHub <span aria-hidden="true">→</span>
          </a>
        </div>
      </article>
    </li>
  );
}
