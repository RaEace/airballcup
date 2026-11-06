# Responsive mobile et performances — Plan d'implémentation

> **Pour les agents :** exécuter tâche par tâche (ralph-loop + sous-agent `implementer`, ponytail full). Cases `- [ ]` pour le suivi.

**Objectif :** site Airball Cup fluide sur mobile et rapide au chargement (Lighthouse mobile ≥ 90, LCP ≤ 2,5 s), sans perdre les effets visuels.

**Architecture :** retirer le poids (polices, images, JS) puis rendre accueil/classement en ISR sur Netlify, puis passer en défilement natif et corriger les sections mobiles. Pas de refonte graphique.

**Stack :** Next.js 15.5, React 19, Tailwind 3, Payload 3.58, pnpm, Netlify.

**Spec :** `docs/specs/2026-11-06-responsive-perf.md`

## Gates (pas de script `test`/`typecheck`)

`GATE = pnpm lint && pnpm exec tsc --noEmit`. Le lint était cassé (`.eslintrc.cjs` : `"disabled"` → `"off"`, corrigé en tâche 2) et révèle 8 erreurs + 3 avertissements préexistants hors périmètre (liste en tâche 2). Règle : aucun nouveau problème lint (≤ 11) et fichiers touchés propres ; écart au critère 1 de la spec, à lister en réconciliation. `pnpm build` en plus quand un `.env` valide existe (sinon noté « build non vérifié » dans le commit). `TASK_DONE` seulement si GATE passe et que la commande « Done » de la tâche passe.

## Contraintes globales

- Effets conservés : fondu d'ouverture (CSS, ≤ 300 ms, coupé si `prefers-reduced-motion`), scroll-snap (`proximity`), photos flottantes, galerie à deux rangées.
- Polices Thunder et Obviously conservées ; cibles tactiles ≥ 44×44 px ; pas de `netlify.toml` sauf nécessité.
- Données fraîches : classement 60 s, reste 1 h ; `invalidateRankingsCache` continue de fonctionner ; l'admin connecté garde « Importer un classement » et l'édition des lignes.

## Review Focus

- JS désactivé : le texte du hero doit rester visible.
- Admin non connecté / connecté : le lien d'import n'apparaît que pour l'admin, sans casser le cache public.
- Écran 320 px : aucun défilement horizontal, en haut et en bas.
- Classement avec 0 ligne ou 1 page : pas de crash, pas de saut de mise en page.
- Ancre du menu (`#section`) : le titre n'est pas masqué par le header.

---

### Tâche 1 : Mesure de départ

**Files :** Create `docs/perf/baseline.md`

- [ ] Demander à l'utilisateur l'URL de production Netlify et celle d'un classement (bloquant ; à défaut, utiliser `pnpm build && pnpm start` avec `.env` et le noter).
- [ ] Lancer 3 fois par URL : `npx lighthouse <url> --form-factor=mobile --only-categories=performance,accessibility --output=json --output-path=<scratch>/run-N.json`. Consigner dans `docs/perf/baseline.md` les médianes : Performance, Accessibilité, LCP, CLS, TBT, poids transféré, polices téléchargées.
- [ ] Commit `feat(responsive-perf): tâche 1 — mesure de départ`.

**Done :** `test -s docs/perf/baseline.md && grep -c "LCP" docs/perf/baseline.md` (≥ 1).

### Tâche 2 : Nettoyage dépôt et JS client

**Files :** Modify `package.json`, `pnpm-lock.yaml`, `src/lib/utils.ts` ; Delete `src/assets/photos/home-background-phone.JPG`

**Interfaces :** Produit : `cn(...)` de `src/lib/utils.ts` sans import `@std/toml`.

- [ ] Déplacer hors de `utils.ts` tout usage de `@std/toml` vers le seul module serveur qui l'utilise (`grep -rn "std/toml" src`).
- [ ] `git rm` le JPG de 14 Mo. Pour chacune de `react-router react-router-dom easy-peasy xlsx react-intl react-dropzone graphql markdown-it` : `grep -rn "<nom>" src *.config.* ` ; si aucun usage, `pnpm remove <nom>`. Justifier tout dépôt conservé dans le message de commit.
- [ ] Commit `feat(responsive-perf): tâche 2 — nettoyage`.

**Done :** `! grep -rn "std/toml" src/lib/utils.ts && ! test -e src/assets/photos/home-background-phone.JPG && GATE`.

### Tâche 3 : Polices via `next/font/local`

**Files :** Modify `src/app/(app)/font-config.css` (ou supprimer), `src/app/(app)/layout.tsx`, `tailwind.config.js` ; Create `src/app/(app)/fonts.ts`

**Interfaces :** Produit : `thunder` et `obviously` (`NextFontWithVariable`, variables CSS `--font-thunder`, `--font-obviously`) exportés de `fonts.ts`, appliqués sur `<html>`.

- [ ] Relever les graisses réellement utilisées (`grep -rhoE "font-(medium|semibold|bold|extrabold)" src | sort -u`, plus les classes `font-*` de la config Tailwind).
- [ ] Dans `fonts.ts`, `localFont` avec uniquement ces graisses, `.woff2` de `src/assets/thunder/Web-TT/` (une seule variante HC *ou* LC par graisse, choisie après comparaison visuelle) ; Obviously en `.otf` limité aux graisses utilisées, `display: 'swap'`.
- [ ] Brancher les variables dans `tailwind.config.js` (`fontFamily`) et retirer les `@font-face` `.ttf`/`.otf`.
- [ ] Commit `feat(responsive-perf): tâche 3 — polices`.

**Done :** `! grep -rE "\.(ttf|otf)" src/app --include=*.css && GATE`.

### Tâche 4 : Images statiques (hero, logo)

**Files :** Modify `src/contents/sections/cta.tsx`, `src/components/Logo.tsx`, `src/components/header.tsx`, `src/contents/fallback/Fallback.tsx`, `src/app/(app)/layout.tsx` ; remplacer `src/assets/photos/bg-img.png`, `src/assets/logo.svg`

- [ ] Convertir `bg-img.png` en WebP ≤ 300 Ko (largeur max 1600 px, `sharp`), le servir via `next/image` (`fill`, `priority`, `sizes="100vw"`) au lieu du `bg-cta` CSS.
- [ ] Remplacer `logo.svg` (370 Ko, raster embarqué) par un SVG vectoriel ou WebP dimensionné ≤ 300 Ko ; mettre à jour header, favicon et fallback.
- [ ] Commit `feat(responsive-perf): tâche 4 — images statiques`.

**Done :** `find src/assets/photos src/assets/logo* -size +300k | wc -l` vaut 0 (hors fichiers non importés listés dans le commit) `&& GATE`.

### Tâche 5 : Galerie et carrousel via `next/image`

**Files :** Modify `src/components/photo-displayer/photo-displayer.tsx`, `src/components/winner-carousel.tsx`, `next.config.mjs`

- [ ] Remplacer les `<img>` par `next/image` avec `width`/`height` (ou `fill` + conteneur à ratio fixe), `sizes` adapté, `loading="lazy"` ; conserver les deux rangées et ne pas dupliquer plus que nécessaire à l'animation.
- [ ] Vérifier que `remotePatterns` couvre `storage.googleapis.com`.
- [ ] Commit `feat(responsive-perf): tâche 5 — images Payload`.

**Done :** `! grep -n "<img" src/components/photo-displayer/photo-displayer.tsx src/components/winner-carousel.tsx && GATE`.

### Tâche 6 : Accueil et classement en ISR, lien admin côté client

**Files :** Modify `src/app/(app)/page.tsx`, `src/app/(app)/rankings/[id]/page.tsx` ; Create `src/components/admin-upload-link.tsx`

**Interfaces :** Produit : `<AdminUploadLink />` (client) qui appelle `GET /api/users/me` après montage et rend le lien « Importer un classement » (vers `/rankings/upload`) seulement si un utilisateur est renvoyé ; rien sinon.

- [ ] Supprimer `headers()` et `payload.auth()` des deux pages ; `export const revalidate` = 60 (classement) et 3600 (accueil).
- [ ] Insérer `<AdminUploadLink />` à la place du lien conditionnel ; contrôle d'accès réel de `/rankings/upload` et des actions serveur inchangé.
- [ ] Commit `feat(responsive-perf): tâche 6 — ISR`.

**Done :** `! grep -nE "headers\(|payload\.auth" "src/app/(app)/page.tsx" "src/app/(app)/rankings/[id]/page.tsx" && GATE`, et `pnpm build` montre `/` et `/rankings/[id]` en `○`/`●` (si `.env` dispo, sinon vérifié sur le deploy preview, tâche 11).

### Tâche 7 : Fondu CSS et composants serveur

**Files :** Modify `src/contents/PageShell.tsx`, `src/contents/sections/history.tsx`, `src/contents/App.css`, `src/hooks/use-parallax.ts` (supprimer si orphelin)

**Interfaces :** Produit : `PageShell` sans `"use client"` ni framer-motion ; classe CSS `animate-page-in` (opacité 0→1, 300 ms, désactivée sous `prefers-reduced-motion`).

- [ ] `PageShell` : fondu via `@keyframes` CSS, sans état initial `opacity: 0` dépendant du JS.
- [ ] `history.tsx` : retirer la parallaxe inopérante, repasser en composant serveur ; garder `FloatingPicture`.
- [ ] Retirer `framer-motion` de `package.json` si plus aucun import.
- [ ] Commit `feat(responsive-perf): tâche 7 — fondu CSS`.

**Done :** `! grep -rln "framer-motion" src/contents/PageShell.tsx src/contents/sections/history.tsx && GATE`.

### Tâche 8 : Défilement natif, scroll-snap, header, ancres

**Files :** Modify `src/app/(app)/layout.tsx`, `src/app/(app)/page.tsx`, `src/app/(app)/index.css`, `src/components/header.tsx`, `src/contents/sections/cta.tsx`

- [ ] Supprimer `#smooth-wrapper` (`h-screen overflow-y-scroll`) ; défilement sur `html`. `scroll-snap-type: y proximity` sur `html`, `scroll-snap-align` sur les sections.
- [ ] Remplacer `h-screen`/`h-full`/`w-screen` par `min-h-svh`/`w-full` sur les sections et le hero.
- [ ] Header : hauteur réduite sur mobile (≤ 64 px), bouton « Je m'inscris » mobile réellement masqué (`hidden`, pas `invisible`) ; `scroll-margin-top` ≥ hauteur du header sur chaque section ancre.
- [ ] Commit `feat(responsive-perf): tâche 8 — défilement natif`.

**Done :** `! grep -rn "smooth-wrapper\|h-screen\|w-screen" src --include=*.tsx --include=*.css && GATE`.

### Tâche 9 : Classement mobile

**Files :** Modify `src/components/rankings/elo-ranking-table.tsx`, `src/components/rankings/columns.tsx`, `src/app/(app)/rankings/[id]/page.tsx` ; Delete `src/hooks/use-media-query.ts` si orphelin

- [ ] Colonne du rang toujours visible ; colonnes secondaires masquées par classes Tailwind responsives, plus de `useMediaQuery`.
- [ ] Retirer `h-screen`/`h-1/2`/`h-[50vh]` : le tableau prend sa hauteur naturelle ; mascotte sans chevauchement du titre (320 px) ; titre sans `mt-40` fixe.
- [ ] Clé sur les lignes rendues dans un fragment (`<Fragment key=…>`) ; pagination avec cibles ≥ 44 px ; 0 ligne et 1 page sans erreur.
- [ ] **Régression tâche 6 à corriger :** `EloRankingTable` ne reçoit plus `isAdmin` (retiré avec `payload.auth`) ; l'admin ne voit plus l'édition/suppression des lignes. Extraire un hook client `useIsAdmin()` (fetch `/api/users/me`, partagé avec `src/components/admin-upload-link.tsx`) et l'utiliser dans le tableau. Les server actions gardent `requireAdmin`.
- [ ] Commit `feat(responsive-perf): tâche 9 — classement mobile`.

**Done :** `! grep -rn "useMediaQuery" src/components/rankings "src/app/(app)/rankings" && GATE`.

### Tâche 10 : Débordements horizontaux des sections

**Files :** Modify `src/contents/sections/{tournament-info,cost,rules,history,winners}.tsx`, `src/components/footer.tsx`, `src/components/winner-carousel.tsx`, `src/components/arrow-button.tsx`

- [ ] `tournament-info` : grille `grid-cols-1 sm:grid-cols-3`, carte `w-full`. `cost`/`rules` : retirer `whitespace-nowrap` sur mobile, bandeau `w-[110%]` contenu. `winners` : SVG décoratif contenu, `min-w-[300px]` → `min-w-0`. `footer` : `min-h` au lieu de `h-[573px]`.
- [ ] `history` : `overflow-x-clip` sur la section pour contenir les photos flottantes.
- [ ] Cibles tactiles ≥ 44 px (menu, flèches du carrousel).
- [ ] Commit `feat(responsive-perf): tâche 10 — débordements`.

**Done :** `GATE` et, via Chrome DevTools/`npx playwright` ou Lighthouse, `document.documentElement.scrollWidth <= window.innerWidth` à 320, 360, 390 px sur `/` et un classement (résultat collé dans le message de commit).

### Tâche 11 : Mesure finale

**Files :** Create `docs/perf/after.md`

- [ ] Après déploiement du deploy preview Netlify de la branche (action utilisateur : fournir l'URL), refaire les 3 passages Lighthouse comme en tâche 1 et comparer à la baseline.
- [ ] Vérifier : `curl -sI <url> | grep -i cache-status` (hit à la 2e visite), `curl -s <url> | grep -c "_next/image\|.netlify/images"` > 0, région des fonctions Netlify (EU), revalidation 60 s après modification d'un classement.
- [ ] Commit `feat(responsive-perf): tâche 11 — mesure finale`.

**Done :** `grep -c "Performance" docs/perf/after.md` ≥ 1 et chiffres ≥ cibles de la spec (sinon écart listé en réconciliation).
