import s from "./ProjectVisual.module.css";

/*
 * Maquettes 100 % CSS utilisées à la place de captures d'écran
 * (aucun dépôt n'en contient). Trois gabarits : navigateur, téléphone, fenêtre
 * de bureau, plus une maquette dédiée au projet vedette (BI Assistant).
 * Tout est décoratif : aria-hidden, le vrai contenu est dans le texte de la carte.
 */

/* Lignes de "faux texte" (squelette d'interface) */
function Lines({ count = 3 }) {
  return (
    <div className={s.lines}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className={s.line} />
      ))}
    </div>
  );
}

function Browser({ title, slug }) {
  return (
    <div className={s.browser}>
      <div className={s.chrome}>
        <span className={s.dots}>
          <i /> <i /> <i />
        </span>
        <span className={s.url}>localhost/{slug}</span>
      </div>
      <div className={s.page}>
        <div className={s.nav}>
          <span className={s.logo} />
          <span className={s.navLinks} />
        </div>
        <p className={s.pageTitle}>{title}</p>
        <Lines count={2} />
        <div className={s.tiles}>
          <span /> <span /> <span />
        </div>
      </div>
    </div>
  );
}

function Phone({ title }) {
  return (
    <div className={s.phone}>
      <span className={s.notch} />
      <p className={s.phoneTitle}>{title}</p>
      <div className={s.phoneCard} />
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className={s.row}>
          <span className={s.avatarDot} />
          <Lines count={1} />
        </div>
      ))}
      <span className={s.fab} />
    </div>
  );
}

function Desktop({ title }) {
  return (
    <div className={s.window}>
      <div className={s.titleBar}>
        <span>{title}</span>
        <span className={s.winBtns}>
          <i /> <i /> <i />
        </span>
      </div>
      <div className={s.winBody}>
        <div className={s.sidebar}>
          <span /> <span /> <span /> <span />
        </div>
        <div className={s.table}>
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} className={i === 0 ? s.thead : undefined} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* Maquette du projet vedette : question en langage naturel → SQL → graphique.
   Données 100 % fictives : aucune donnée interne de la banque. */
function BiMockup() {
  return (
    <div className={`${s.browser} ${s.biBrowser}`}>
      <div className={s.chrome}>
        <span className={s.dots}>
          <i /> <i /> <i />
        </span>
        <span className={s.url}>bi-assistant / assistant</span>
      </div>
      <div className={s.biBody}>
        <div className={s.bubbleUser}>Quelles régions ont ouvert le plus de comptes ce trimestre ?</div>
        <div className={s.bubbleAi}>
          <code className={s.sql}>
            <b>SELECT</b> region, <b>COUNT</b>(*) <b>AS</b> nb
            <br />
            <b>FROM</b> comptes <b>GROUP BY</b> region
            <br />
            <b>ORDER BY</b> nb <b>DESC LIMIT</b> 5;
          </code>
          {/* Mini graphique en barres (hauteurs arbitraires) */}
          <div className={s.chart}>
            {[88, 72, 60, 45, 30].map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectVisual({ kind, title, slug }) {
  return (
    <div className={s.stage} aria-hidden="true">
      {kind === "bi" && <BiMockup />}
      {kind === "browser" && <Browser title={title} slug={slug} />}
      {kind === "phone" && <Phone title={title} />}
      {kind === "desktop" && <Desktop title={title} />}
    </div>
  );
}
