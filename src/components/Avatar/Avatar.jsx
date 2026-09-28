import { useState } from "react";
import s from "./Avatar.module.css";

const BASE = import.meta.env.BASE_URL;

/**
 * Affiche une illustration de l'avatar avec deux niveaux de secours :
 *   1. on essaie d'abord la version .webp (optimisée) ;
 *   2. si elle n'existe pas, on retombe sur le .png d'origine ;
 *   3. si le .png manque aussi, on dessine un rectangle gris avec le nom du fichier.
 *
 * @param {string}  name   nom du fichier SANS extension (ex. "hero-sketch")
 * @param {string}  alt    texte alternatif ("" si l'image est décorative)
 * @param {boolean} eager  true pour l'image du Hero (chargée tout de suite, priorité haute)
 * @param {"sketch"|"color"} tone  teinte du rectangle de secours
 */
export default function Avatar({ name, alt = "", eager = false, tone = "sketch", className = "" }) {
  const sources = [`${BASE}assets/avatar/${name}.webp`, `${BASE}assets/avatar/${name}.png`];

  // Index de la source en cours d'essai (0 = webp, 1 = png, 2 = rectangle gris)
  const [index, setIndex] = useState(0);

  if (index >= sources.length) {
    return (
      <div
        className={`${s.placeholder} ${tone === "color" ? s.placeholderColor : ""} ${className}`}
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
      >
        <span className={s.placeholderLabel}>{name}.png</span>
      </div>
    );
  }

  return (
    <img
      src={sources[index]}
      alt={alt}
      className={`${s.img} ${className}`}
      // Le Hero est l'image LCP : pas de lazy loading pour elle
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      // En cas d'erreur (fichier absent), on passe à la source suivante
      onError={() => setIndex((i) => i + 1)}
    />
  );
}
