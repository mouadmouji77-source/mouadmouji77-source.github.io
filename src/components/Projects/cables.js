/*
 * CÂBLES DE DONNÉES — calcul du tracé d'un câble ondulé entre deux points.
 *
 * Le câble est découpé en N segments de courbes de Bézier quadratiques (Q).
 * Chaque point de contrôle est décalé perpendiculairement au câble,
 * alternativement d'un côté puis de l'autre → une onde.
 *
 *  - `amp` (amplitude) : grande quand la carte est loin (câble lâche qui ondule),
 *    petite quand la carte arrive (câble tendu).
 *  - `time` : fait "vibrer" l'onde en continu, comme un câble qu'on tire.
 *  - Une enveloppe en sinus annule l'onde aux deux extrémités : le câble
 *    reste bien accroché aux mains de l'avatar et à la prise de la carte.
 */
const SEGMENTS = 8;

export function cablePath(x1, y1, x2, y2, amp, time) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;

  // Vecteur normal (perpendiculaire au câble), longueur 1
  const nx = -dy / len;
  const ny = dx / len;

  let d = `M${x1.toFixed(1)} ${y1.toFixed(1)}`;

  for (let i = 1; i <= SEGMENTS; i++) {
    const tMid = (i - 0.5) / SEGMENTS; // milieu du segment (point de contrôle)
    const tEnd = i / SEGMENTS;         // fin du segment

    const envelope = Math.sin(Math.PI * tMid);      // 0 aux bouts, 1 au milieu
    const side = i % 2 ? 1 : -1;                    // alterne haut / bas
    const wobble = 0.75 + 0.25 * Math.sin(time * 4 + i); // vibration continue
    const offset = side * amp * envelope * wobble;

    const cx = x1 + dx * tMid + nx * offset;
    const cy = y1 + dy * tMid + ny * offset;
    const ex = x1 + dx * tEnd;
    const ey = y1 + dy * tEnd;

    d += ` Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
  }
  return d;
}
