import s from "./Doodles.module.css";

/*
 * DOODLES DU HERO — petits dessins "à la main" autour de l'avatar.
 *
 * Deux astuces pour l'effet "dessiné au crayon" :
 *  1. Chaque trait a la classe "js-draw" et l'attribut pathLength="1" :
 *     sa longueur vaut toujours 1, quelle que soit sa taille réelle.
 *     GSAP n'a plus qu'à animer stroke-dashoffset de 1 → 0 pour le "tracer".
 *  2. Un filtre SVG (#rough) déforme très légèrement les traits
 *     pour casser la perfection géométrique : rendu irrégulier, fait main.
 *
 * Les doodles marqués `s.optional` sont masqués sur mobile (version simplifiée).
 */

/* Étiquette penchée (SQL, POWER BI...) : cadre un peu tordu + texte */
function Tag({ text, width, className }) {
  const w = width;
  return (
    <svg className={`${s.doodle} ${className}`} viewBox={`0 0 ${w} 44`} aria-hidden="true">
      {/* Cadre volontairement pas tout à fait rectangulaire */}
      <path
        className="js-draw"
        pathLength="1"
        d={`M5 7 L${w - 7} 3.5 L${w - 3} 37 L4 40.5 Z`}
      />
      {/* Petit trou d'étiquette */}
      <circle className="js-draw" pathLength="1" cx="13" cy="22" r="3" />
      <text className={`${s.tagText} js-tag-text`} x={w / 2 + 6} y="27.5" textAnchor="middle">
        {text}
      </text>
    </svg>
  );
}

export default function Doodles() {
  return (
    <div className={s.doodles} aria-hidden="true">
      {/* Filtre de "tremblement" partagé par tous les doodles */}
      <svg width="0" height="0" className={s.defs}>
        <filter id="rough">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="2.2" />
        </filter>
      </svg>

      {/* Flèche courbe : part du texte d'intro et pointe vers l'avatar */}
      <svg className={`${s.doodle} ${s.arrowIn}`} viewBox="0 0 120 80">
        <path className="js-draw" pathLength="1" d="M6 16 C 28 3, 68 5, 90 36 C 96 46, 99 55, 100 66" />
        <path className="js-draw" pathLength="1" d="M88 57 L100.5 68 L108 52" />
      </svg>

      {/* Flèche en boucle, en haut à droite */}
      <svg className={`${s.doodle} ${s.arrowLoop} ${s.optional}`} viewBox="0 0 140 100">
        <path
          className="js-draw"
          pathLength="1"
          d="M8 82 C 30 92, 62 72, 59 49 C 57 31, 35 33, 40 50 C 46 71, 92 70, 126 30"
        />
        <path className="js-draw" pathLength="1" d="M109 28.5 L127 29 L123.5 46" />
      </svg>

      {/* Étoiles */}
      <svg className={`${s.doodle} ${s.starA}`} viewBox="0 0 40 40">
        <path
          className="js-draw"
          pathLength="1"
          d="M20 3 L24.6 15.2 L37 15.6 L27.2 23.6 L31 36.4 L20.2 28.6 L9.4 36.6 L13 23.4 L3 15.8 L15.7 15 Z"
        />
      </svg>
      <svg className={`${s.doodle} ${s.starB} ${s.optional}`} viewBox="0 0 40 40">
        <path
          className="js-draw"
          pathLength="1"
          d="M20 4 L24 15.6 L36.4 16 L26.6 23.2 L30.6 35.6 L20 28.2 L9.8 35.8 L13.4 23.6 L3.6 16.2 L15.8 15.2 Z"
        />
      </svg>
      {/* Étincelle à 4 branches */}
      <svg className={`${s.doodle} ${s.sparkle} ${s.optional}`} viewBox="0 0 30 30">
        <path
          className="js-draw"
          pathLength="1"
          d="M15 2 C 16 11, 18 13.2, 28 15 C 18 16.6, 16 19, 15 28 C 14 19, 12 16.4, 2 15 C 12 13.6, 14 11, 15 2 Z"
        />
      </svg>

      {/* Étiquettes techno */}
      <Tag text="SQL" width={78} className={s.tagSql} />
      <Tag text="POWER BI" width={122} className={s.tagPowerbi} />
      <Tag text="PYTHON" width={108} className={s.tagPython} />
      <Tag text="RAG" width={76} className={s.tagRag} />

      {/* Crayon */}
      <svg className={`${s.doodle} ${s.pencil} ${s.optional}`} viewBox="0 0 120 40">
        <path className="js-draw" pathLength="1" d="M11 12 L90 10 L92 30 L12 31.5" />
        <path className="js-draw" pathLength="1" d="M11 12 C 4 14, 4 29, 12 31.5" />
        <path className="js-draw" pathLength="1" d="M23 11.6 L24 31" />
        <path className="js-draw" pathLength="1" d="M90 10 L113 20.5 L92 30" />
        <path className="js-draw" pathLength="1" d="M105 17 L113 20.5 L105.5 24" />
      </svg>

      {/* Cylindre de base de données */}
      <svg className={`${s.doodle} ${s.db}`} viewBox="0 0 70 84">
        <path className="js-draw" pathLength="1" d="M6 16 C 6 6, 64 6, 64 16 C 64 26, 6 26, 6 16 Z" />
        <path className="js-draw" pathLength="1" d="M6 16 L6.5 68 C 7 79, 63 79, 64 68 L64 16" />
        <path className="js-draw" pathLength="1" d="M6.3 34 C 7 44, 63 44, 64 34" />
        <path className="js-draw" pathLength="1" d="M6.4 51 C 7 61, 63 61, 64 51" />
      </svg>
    </div>
  );
}
