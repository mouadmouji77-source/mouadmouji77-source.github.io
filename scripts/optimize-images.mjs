// Script d'optimisation : convertit chaque PNG de public/assets/avatar en WebP.
// Le WebP garde la transparence et pèse en général 3 à 5 fois moins lourd,
// ce qui aide beaucoup le score Lighthouse (LCP).
// Usage : npm run optimize:images
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DOSSIER = path.resolve("public/assets/avatar");
const HAUTEUR_MAX = 1400; // largement suffisant, même sur écran Retina

const fichiers = (await readdir(DOSSIER)).filter((f) => f.toLowerCase().endsWith(".png"));

if (fichiers.length === 0) {
  console.log("Aucun PNG trouvé dans", DOSSIER);
}

for (const fichier of fichiers) {
  const source = path.join(DOSSIER, fichier);
  const cible = source.replace(/\.png$/i, ".webp");

  // On saute les fichiers déjà convertis (WebP plus récent que le PNG)
  const dejaFait = await stat(cible)
    .then(async (c) => c.mtimeMs > (await stat(source)).mtimeMs)
    .catch(() => false);
  if (dejaFait) {
    console.log("✓ déjà à jour :", fichier);
    continue;
  }

  await sharp(source)
    .resize({ height: HAUTEUR_MAX, withoutEnlargement: true })
    .webp({ quality: 82, alphaQuality: 90 })
    .toFile(cible);

  const avant = (await stat(source)).size / 1024;
  const apres = (await stat(cible)).size / 1024;
  console.log(`→ ${fichier} : ${avant.toFixed(0)} Ko → ${apres.toFixed(0)} Ko`);
}
