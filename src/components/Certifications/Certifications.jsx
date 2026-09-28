import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../../lib/gsap";
import { oracleCerts, courseGroups } from "../../data/certifications";
import SectionTitle from "../SectionTitle/SectionTitle";
import s from "./Certifications.module.css";

const courseCount = courseGroups.reduce((n, g) => n + g.courses.length, 0);

/*
 * Sceau "tampon" dessiné en SVG : anneau pointillé, texte circulaire,
 * sigle au centre. Volontairement générique (pas de logo Oracle).
 */
function Seal({ label, id }) {
  const pathId = `seal-path-${id}`;
  return (
    <svg className={`${s.seal} js-seal`} viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        {/* Cercle sur lequel le texte s'enroule */}
        <path id={pathId} d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
      </defs>
      <circle cx="60" cy="60" r="56" className={s.sealOuter} />
      <circle cx="60" cy="60" r="33" className={s.sealInner} />
      {/* Le texte circulaire tourne lentement au survol de la carte */}
      <g className={s.sealRing}>
        <text className={s.sealText}>
          <textPath href={`#${pathId}`}>CERTIFIED PROFESSIONAL ✦ CERTIFIED PROFESSIONAL ✦</textPath>
        </text>
      </g>
      <text x="60" y="66" textAnchor="middle" className={s.sealLabel}>
        {label}
      </text>
    </svg>
  );
}

export default function Certifications() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Les cartes Oracle arrivent comme un coup de tampon :
        // un peu trop grandes et tournées, puis "posées" d'un coup sec.
        gsap.from(".js-cert", {
          scale: 1.25,
          rotate: (i) => [-6, 4, -3][i % 3],
          autoAlpha: 0,
          duration: 0.55,
          stagger: 0.15,
          ease: "back.out(2.2)",
          scrollTrigger: { trigger: ".js-certs", start: "top 80%", toggleActions: "play none none reverse" },
        });

        // Les lignes Coursera glissent depuis la gauche, groupe par groupe
        gsap.utils.toArray(".js-group").forEach((group) => {
          gsap.from(group.querySelectorAll(".js-course"), {
            x: -30,
            autoAlpha: 0,
            duration: 0.45,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: { trigger: group, start: "top 85%", toggleActions: "play none none reverse" },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="certifications" ref={root} className="section" aria-labelledby="certifications-title">
      <SectionTitle
        id="certifications-title"
        ghost="CERTIFIED"
        kicker="05 — Certifications"
        title="Certifications"
        hand="always learning"
      />

      {/* ---------- Niveau 1 : certifications professionnelles Oracle ---------- */}
      <h3 className={s.subhead}>
        Certifications professionnelles <span>Oracle</span>
      </h3>
      <ul className={`${s.certs} js-certs`}>
        {oracleCerts.map((c, i) => (
          <li key={c.url} className={`${s.cert} js-cert`}>
            <Seal label={c.seal} id={i} />
            <p className={s.issuer}>Oracle</p>
            <h4 className={s.certTitle}>{c.title}</h4>

            <dl className={s.dates}>
              <div>
                <dt>Obtenue le</dt>
                <dd>{c.issued}</dd>
              </div>
              {c.validUntil && (
                <div>
                  <dt>Valide jusqu'au</dt>
                  <dd>{c.validUntil}</dd>
                </div>
              )}
            </dl>

            <a className={s.verify} href={c.url} target="_blank" rel="noreferrer">
              Vérifier <span aria-hidden="true">↗</span>
              <span className="visually-hidden"> la certification {c.title} (nouvel onglet)</span>
            </a>
          </li>
        ))}
      </ul>

      {/* ---------- Niveau 2 : cours en ligne Coursera ---------- */}
      <h3 className={s.subhead}>
        Cours en ligne <span>Coursera · {courseCount} certificats</span>
      </h3>
      <div className={s.groups}>
        {courseGroups.map((g) => (
          <div key={g.theme} className={`${s.group} js-group`}>
            <h4 className={s.theme}>{g.theme}</h4>
            <ul className={s.courses}>
              {g.courses.map((c) => (
                <li key={c.url} className="js-course">
                  {/* Toute la ligne est cliquable */}
                  <a className={s.course} href={c.url} target="_blank" rel="noreferrer">
                    <span className={s.courseTitle}>{c.title}</span>
                    <span className={s.courseMeta}>
                      {c.issuer} · {c.date}
                    </span>
                    <span className={s.arrow} aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
