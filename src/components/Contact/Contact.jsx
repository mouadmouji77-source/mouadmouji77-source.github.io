import { useRef, useState } from "react";
import { gsap, useGSAP, MOTION_OK } from "../../lib/gsap";
import { enterFromSide } from "../../lib/animations";
import { profile } from "../../data/profile";
import SectionTitle from "../SectionTitle/SectionTitle";
import Avatar from "../Avatar/Avatar";
import s from "./Contact.module.css";

// Liens affichés en grandes lignes cliquables
const LINKS = [
  { label: "LinkedIn", detail: "linkedin.com/in/mouad-mouji", href: profile.linkedin, external: true },
  { label: "GitHub", detail: "github.com/mouadmouji77-source", href: profile.github, external: true },
  { label: "CV", detail: "Télécharger mon CV (PDF)", href: profile.cv, download: true },
];

export default function Contact() {
  const root = useRef(null);
  // État du bouton "Copier" : "idle" | "done" | "error"
  const [copy, setCopy] = useState("idle");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopy("done");
    } catch {
      setCopy("error"); // presse-papiers refusé (navigateur ancien, http...)
    }
    setTimeout(() => setCopy("idle"), 2000);
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // L'avatar accroupi arrive par la droite
        enterFromSide(".js-contact-avatar", { side: "right", trigger: root.current, start: "top 65%" });

        // L'email, puis les liens, montent l'un après l'autre
        gsap.from(".js-contact-item", {
          y: 30,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".js-contact-body", start: "top 80%", toggleActions: "play none none reverse" },
        });
      });
    },
    { scope: root }
  );

  return (
    <footer id="contact" ref={root} className={`section ${s.contact}`} aria-labelledby="contact-title">
      <SectionTitle id="contact-title" ghost="CONTACT" kicker="06 — Contact" title="Get in touch" hand="say hello!" />

      <div className={s.grid}>
        <div className={`${s.body} js-contact-body`}>
          <p className={`${s.lead} js-contact-item`}>
            Je recherche un premier poste en <strong>BI</strong>, <strong>Data Engineering</strong> ou{" "}
            <strong>développement logiciel</strong>. Une opportunité, une question sur un projet ?
            Écris-moi.
          </p>

          {/* Email : l'élément principal, surligné en jaune (2e et dernière utilisation) */}
          <div className={`${s.emailRow} js-contact-item`}>
            <a className={s.email} href={`mailto:${profile.email}`}>
              <span className={s.highlight}>{profile.email}</span>
            </a>
            <button type="button" className={s.copy} onClick={copyEmail}>
              {copy === "done" ? "Copié !" : copy === "error" ? "Copie impossible" : "Copier"}
            </button>
            {/* Annonce le résultat de la copie aux lecteurs d'écran */}
            <span className="visually-hidden" aria-live="polite">
              {copy === "done" ? "Adresse email copiée" : ""}
            </span>
          </div>

          <ul className={s.links}>
            {LINKS.map((l) => (
              <li key={l.label} className="js-contact-item">
                <a
                  className={s.link}
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  {...(l.download ? { download: true } : {})}
                >
                  <span className={s.linkLabel}>{l.label}</span>
                  <span className={s.linkDetail}>{l.detail}</span>
                  <span className={s.linkArrow} aria-hidden="true">
                    {l.download ? "↓" : "↗"}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p className={`${s.location} js-contact-item`}>{profile.location}</p>
        </div>

        {/* Avatar accroupi, une main au sol : il "attend" le message */}
        <div className={s.avatarCol}>
          <div className={`${s.avatar} js-contact-avatar`}>
            <Avatar name="crouch" alt="Mouad accroupi, une main au sol, souriant" />
          </div>
        </div>
      </div>

      {/* Pied de page */}
      <div className={s.footer}>
        <span>
          © {new Date().getFullYear()} {profile.firstName} {profile.lastName}
        </span>
        <span>Conçu et développé avec React & GSAP</span>
        <a href="#hero" className={s.top}>
          Retour en haut ↑
        </a>
      </div>
    </footer>
  );
}
