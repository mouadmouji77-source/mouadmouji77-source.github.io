import s from "./Band.module.css";

/**
 * Bandeau séparateur bleu marine pleine largeur, texte blanc en majuscules
 * espacées qui défile en boucle (effet "ticker" d'affiche).
 *
 * @param {string[]} items  les mots à faire défiler
 * @param {number}   tilt   légère inclinaison en degrés (0 = droit)
 * @param {boolean}  reverse  défilement vers la droite au lieu de la gauche
 */
export default function Band({ items, tilt = 0, reverse = false }) {
  // On répète la liste pour qu'elle soit plus large que l'écran,
  // puis on duplique le groupe : l'animation translateX(-50%) boucle
  // alors sans aucune coupure visible.
  // Au moins ~8 éléments par groupe : même un bandeau d'un seul texte
  // ("Let's work together") couvre un écran très large sans trou.
  const times = Math.max(3, Math.ceil(8 / items.length));
  const repeated = Array.from({ length: times }, () => items).flat();

  const group = (hidden) => (
    <ul className={s.group} aria-hidden={hidden || undefined}>
      {repeated.map((item, i) => (
        <li key={i} className={s.item}>
          {item}
          <span className={s.star} aria-hidden="true">✦</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={s.band} style={{ "--tilt": `${tilt}deg` }}>
      {/* Version lisible par les lecteurs d'écran (sans la répétition) */}
      <p className="visually-hidden">{items.join(" · ")}</p>
      <div className={`${s.track} ${reverse ? s.reverse : ""}`} aria-hidden="true">
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
