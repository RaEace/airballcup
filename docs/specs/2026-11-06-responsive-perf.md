# Responsive mobile et performances de chargement

Date : 2026-11-06
Statut : implémentée, mesures finales à faire sur le deploy preview

## Intention

Le site Airball Cup est surtout consulté sur téléphone (lien d'inscription partagé sur Instagram, consultation du classement le soir du tournoi). Aujourd'hui il charge lentement et plusieurs écrans sont pénibles à utiliser au doigt. Selon l'utilisateur, tous les parcours sont concernés : l'arrivée sur l'accueil depuis Instagram, le classement, et le reste du site. L'objectif est double : rendre le site agréable sur mobile et faire tomber drastiquement le temps de chargement, sans refonte visuelle et sans perdre les effets visuels existants.

## Décisions de l'utilisateur

1. **Tous les parcours mobiles comptent**, sans priorité entre eux. Il n'y a pas de téléphone de référence : la validation se fait en émulation (Lighthouse mobile, plus les largeurs 320, 360 et 390 px dans Chrome DevTools).
2. **Hébergement : Netlify**, base **MongoDB en Europe**. La stratégie de cache et d'images doit s'appuyer sur ce que Netlify fournit pour Next.js (voir "Contraintes").
3. **Tous les effets visuels sont conservés** : fondu d'ouverture, scroll-snap section par section, photos flottantes de "Notre histoire", galerie qui défile sur deux rangées. Condition : ils ne doivent ni bloquer l'affichage du contenu, ni casser le défilement natif sur mobile. Réparer la parallaxe (déjà cassée aujourd'hui) est facultatif.
4. **Le lien admin "Importer un classement" peut être déplacé** (dans l'admin Payload, ou affiché côté navigateur après le chargement) pour que l'accueil et le classement soient servis depuis le cache.
5. **Cibles validées** : Lighthouse Performance mobile de 90 ou plus et LCP de 2,5 s ou moins.

## Constat (issu de la lecture du code)

### Causes probables de lenteur, par ordre d'impact estimé

1. **Polices web massives et mal déclarées** (`src/app/(app)/font-config.css`).
   - 32 `@font-face` Thunder en `.ttf` (environ 3 fois plus lourds que les `.woff2` pourtant présents dans `src/assets/thunder/Web-TT/`).
   - Les variantes HC et LC sont déclarées avec la même famille, le même poids et le même style : elles se marchent dessus et le navigateur peut télécharger les deux.
   - 5 graisses Obviously en `.otf` (environ 90 Ko chacune), pas de `woff2` disponible.
   - Le code n'utilise que `font-medium`, `font-semibold`, `font-bold`, `font-extrabold`, et aucun italique.
   - Pas de `next/font`, donc pas de préchargement ni de fallback ajusté.
2. **Images non optimisées.**
   - Fond du hero (`bg-cta`, `src/assets/photos/bg-img.png`) : PNG de 1,7 Mo chargé en CSS, donc ni redimensionné, ni converti, ni prioritaire. C'est très probablement l'élément LCP mobile.
   - `src/assets/logo.svg` (370 Ko) est un SVG qui embarque une image matricielle. Il est utilisé dans le header (au-dessus de la ligne de flottaison), le favicon et le fallback de chargement.
   - Galerie (`photo-displayer.tsx`) et carrousel des vainqueurs (`winner-carousel.tsx`) : balises `<img>` brutes sur les originaux GCS, sans dimensions (layout shift) ni tailles réduites. La galerie duplique chaque image deux fois sur deux rangées : 4 balises par photo.
   - La collection Payload `Media` ne définit aucun `imageSizes` : seuls les originaux existent.
   - `src/assets/photos/home-background-phone.JPG` fait 14 Mo. Il n'est référencé nulle part ; c'est un fichier mort dans le dépôt.
3. **Page d'accueil entièrement dynamique.** `page.tsx` et `rankings/[id]/page.tsx` appellent `headers()` + `payload.auth()` pour savoir si l'utilisateur est connecté (uniquement pour afficher le lien "Importer un classement"). Cela force un rendu serveur à chaque visite, avec initialisation de Payload, au lieu d'une page statique ou ISR servie depuis le cache. Les données elles-mêmes sont déjà en `unstable_cache`.
4. **Tout le contenu de l'accueil est enveloppé dans un composant client qui démarre à `opacity: 0`** (`PageShell.tsx`, framer-motion). Rien n'est visible tant que le JS n'est pas hydraté et l'animation jouée : LCP retardé et framer-motion embarqué dans le bundle pour un simple fondu.
5. **JS client superflu.**
   - `history.tsx` est un composant client uniquement pour un effet de parallaxe qui écoute `window.scroll`, alors que le défilement se fait dans `#smooth-wrapper` (`h-screen overflow-y-scroll`) : `window.scrollY` vaut toujours 0, donc l'effet ne fonctionne pas.
   - `src/lib/utils.ts` (importé par tous les composants UI client via `cn`) importe `@std/toml` : le parseur TOML se retrouve probablement dans le bundle client.
   - Dépendances jamais importées : `react-router`, `react-router-dom`, `easy-peasy`, `xlsx`, `react-intl`, `react-dropzone`, `graphql`, `markdown-it`. Elles ne gonflent pas le bundle si elles ne sont pas importées, mais alourdissent l'installation et le build.
6. Google Tag Manager est chargé via `@next/third-parties` (déjà différé, impact faible, à vérifier dans la mesure).

### Écrans non adaptés au mobile

1. **Défilement global.** Le contenu défile dans un `<main>` `w-screen h-screen` (100vh) avec un `scroll-snap-type: y mandatory` déclaré sur `html` (qui ne défile pas). Sur mobile, `100vh` ne tient pas compte de la barre d'adresse : les sections `h-full` sont coupées et le défilement interne casse le comportement natif (barre d'adresse qui ne se replie pas, retour en haut au tap sur la barre d'état iOS absent, ancres décalées). `w-screen` peut aussi créer un débordement horizontal.
2. **Hero (`cta.tsx`).** `h-full` sur 100vh plus un header absolu de 104 px : sur un petit écran, le titre `text-display-s` et les deux boutons peuvent passer sous le header ou sous la barre du navigateur. `mr-2` crée un décalage asymétrique.
3. **Header.** 104 px de haut sur mobile (environ 15 % d'un écran de 667 px). Le bouton "Je m'inscris" mobile est rendu invisible mais garde sa place et son lien (`invisible` plus `disabled` sur un `Button` dans un `Link`, donc toujours focalisable et cliquable via le lien).
4. **Classement (`rankings/[id]/page.tsx`, `elo-ranking-table.tsx`).**
   - Section `h-screen` avec un `h1` `mt-40` et un tableau dans un bloc `h-1/2` dont la table fait elle-même `h-[50vh]` : sur mobile, le tableau est écrasé et la mascotte (`absolute`) chevauche le titre.
   - Sur mobile la colonne du rang (#) est masquée : l'information principale d'un classement n'est visible qu'après un tap pour déplier la ligne.
   - `useMediaQuery` démarre à `false` côté serveur : la page s'affiche d'abord en version desktop puis bascule (saut de mise en page).
   - Pagination par 10 avec 5 boutons : beaucoup de taps pour trouver son équipe, pas de recherche.
   - Les lignes rendues dans un fragment `<>` sans clé (avertissement React, re-rendus inutiles).
5. **Sections diverses.**
   - `tournament-info.tsx` : grille fixe à 3 colonnes (Horaire, Bar, Métros) même sur 320 px ; la carte fait `w-[100vw] h-[50vh]`.
   - `cost.tsx` : nombreux `whitespace-nowrap` sur des titres `text-subtitle-*` dans une grille à 2 colonnes, risque de débordement horizontal.
   - `rules.tsx` : titre `whitespace-nowrap`, bandeau marquee `w-[110%]`, `pt-[11rem]`.
   - `history.tsx` : photos flottantes en `absolute` avec `-left-20` et `-right-40` visibles sur mobile, sources probables de débordement horizontal.
   - `winners.tsx` : SVG décoratif de 2131 px de large, grille `grid-rows-4` imposée, carrousel `min-w-[300px]` (déborde sous 348 px avec le padding).
   - Footer à hauteur fixe (`h-[573px]`).
   - Menu burger : les liens de navigation interne sont des `Link` vers `#ancre` dans un défilement interne au `<main>`, d'où un comportement d'ancre peu fiable.

## Objectifs mesurables

Les mesures se font sur la page d'accueil et sur une page de classement, sur un déploiement Netlify (production pour la mesure initiale, deploy preview de la branche pour la mesure finale), avec Lighthouse mobile (profil par défaut : Moto G Power, 4G lente simulée). Mesurer sur Netlify plutôt qu'en local permet d'inclure le cache CDN et Netlify Image CDN dans le résultat. Chaque mesure est la médiane de 3 passages Lighthouse, pour limiter la variabilité.

| Indicateur | Cible |
|---|---|
| Score Lighthouse Performance mobile, accueil | 90 ou plus |
| Score Lighthouse Performance mobile, classement | 90 ou plus |
| LCP mobile (accueil) | 2,5 s ou moins |
| CLS (accueil et classement) | 0,1 ou moins |
| TBT mobile | 200 ms ou moins |
| Poids total transféré au premier affichage de l'accueil (avant défilement) | 1 Mo ou moins |
| Polices téléchargées au premier affichage | 4 fichiers `woff2` au plus, 200 Ko au total au plus |
| Débordement horizontal à 320, 360 et 390 px de large | aucun, sur toutes les sections |
| Score Lighthouse Accessibilité mobile | pas de régression par rapport à la mesure initiale |

La première tâche du plan sera de relever la mesure initiale (baseline) de ces indicateurs, pour pouvoir prouver le gain.

## Périmètre

Performances :
- Polices : ne garder que les graisses réellement utilisées, en `woff2`, une seule variante Thunder (HC ou LC) par graisse, via `next/font/local` (préchargement et `font-display: swap` gérés par Next).
- Images statiques : convertir et redimensionner le fond du hero, servir ce fond via `next/image` avec `priority` (ou au moins en `image-set` WebP/AVIF), remplacer le logo par une version légère (SVG vectoriel réel ou PNG/WebP dimensionné).
- Images Payload : passer galerie et carrousel sur `next/image` (avec `sizes` et dimensions). Sur Netlify, `next/image` est servi automatiquement par Netlify Image CDN (redimensionnement et conversion AVIF/WebP à la volée, mis en cache au CDN). Les `remotePatterns` existants (`storage.googleapis.com`) doivent donc continuer à couvrir les URL GCS. Déclarer des `imageSizes` sur la collection `Media` reste possible en complément, mais n'est pas requis.
- Rendu : rendre l'accueil et les pages de classement statiques ou ISR (`revalidate` aligné sur les délais actuels : 60 s pour le classement, 1 h pour le reste). Le lien "Importer un classement" sort du rendu serveur public : il est déplacé dans l'admin Payload, ou affiché par un petit composant client qui interroge `/api/users/me` après le chargement. Sur Netlify, l'ISR et `revalidateTag` passent par l'adaptateur Next.js de Netlify (OpenNext, cache stocké dans Netlify Blobs) : la revalidation à la demande déjà en place (`invalidateRankingsCache`) doit purger aussi le cache CDN, à vérifier après déploiement.
- Fondu d'ouverture conservé, mais en CSS pur (pas de framer-motion), déclenché sans attendre l'hydratation, court (300 ms au plus) et désactivé si `prefers-reduced-motion`. `PageShell` redevient un composant serveur si rien d'autre ne l'en empêche. Le fondu ne doit pas faire manquer la cible LCP.
- Photos flottantes de `history.tsx` conservées (animation CSS existante via `FloatingPicture`). La parallaxe, aujourd'hui inopérante, peut être retirée pour faire de `history.tsx` un composant serveur, ou réparée si c'est peu coûteux ; les deux sont acceptables.
- Galerie à deux rangées conservée, avec des images redimensionnées et chargées en différé (`loading="lazy"`, dimensions fixées pour éviter le décalage de mise en page).
- Sortir `@std/toml` du module importé côté client.
- Supprimer les dépendances inutilisées et le fichier `home-background-phone.JPG`.

Responsive :
- Défilement natif sur `html`/`body` (abandon du conteneur `h-screen overflow-y-scroll`), hauteurs en `svh`/`dvh` ou `min-h` au lieu de `h-screen`/`h-full`.
- Scroll-snap conservé, mais appliqué au conteneur qui défile réellement (`html`). Choix du constructeur entre `mandatory` et `proximity` : `proximity` par défaut, car `mandatory` piège le défilement dans les sections plus hautes que l'écran, fréquentes sur mobile.
- Correction des débordements horizontaux listés ci-dessus, y compris ceux des photos flottantes (contenues par un `overflow-x: clip` sur leur section plutôt que retirées).
- Header compact sur mobile.
- Classement mobile : rang toujours visible, tableau qui occupe la hauteur disponible, pas de bascule desktop vers mobile au chargement (colonnes masquées en CSS par breakpoint plutôt qu'en JS).
- Cibles tactiles d'au moins 44 x 44 px pour les boutons et liens principaux (menu, pagination, flèches du carrousel).

## Hors périmètre

- Refonte graphique, changement de charte, nouveaux contenus ou nouvelles sections.
- Interface d'administration Payload (`/admin`) et page d'import CSV (`/rankings/upload`), hormis ce qui est nécessaire pour ne plus dépendre de l'authentification dans le rendu public.
- Changement d'hébergeur ou de base de données.
- Ajout d'un framework de tests ou d'une CI.
- Recherche dans le classement (idée notée, à traiter séparément si souhaité).

## Anti-objectifs

- Un site plus rapide mais visuellement appauvri au point de ne plus ressembler à Airball Cup (polices Thunder et Obviously conservées, couleurs et mise en page générale conservées).
- Retirer un des effets visuels conservés (fondu, scroll-snap, photos flottantes, galerie à deux rangées) pour atteindre les cibles.
- Un effet qui empêche de défiler normalement au doigt, ou qui retarde l'apparition du contenu.
- Des données affichées périmées au-delà du délai actuel (classement : 60 s ; tournoi, règles, images : 1 h). La revalidation à la demande déjà en place (`invalidateRankingsCache`) doit continuer de fonctionner après un import ou une édition.
- Casser l'édition du classement pour un administrateur connecté.

## Contraintes

- Next.js 15.5, React 19, Tailwind 3, Payload 3.58 (MongoDB, stockage GCS), pnpm.
- Pas de CLAUDE.md projet. Scripts disponibles dans `package.json` : `dev`, `build`, `start`, `lint`. Il n'existe **ni script `typecheck`, ni script `test`** ; la vérification de types passe par `pnpm build` (ou `pnpm exec tsc --noEmit`, `tsc` est installé). Le script `preview` (`vite preview`) est un reste de l'ancienne version Vite et ne fonctionne pas avec Next.
- `pnpm build` nécessite les variables d'environnement Payload (connexion MongoDB, GCS) : en local, il faut un `.env` valide ; les mesures de performance se font sur Netlify.
- Hébergement Netlify, MongoDB en Europe. Les fonctions Netlify tournent par défaut aux États-Unis (us-east-2) : chaque requête non servie par le cache ferait alors un aller-retour transatlantique vers MongoDB. Il faut vérifier la région des fonctions dans les réglages du site Netlify et la passer en Europe (par exemple eu-central-1) si l'offre le permet ; sinon, l'ISR rend ce point secondaire puisque la plupart des visites sont servies par le CDN.
- Aucun `netlify.toml` dans le dépôt : la configuration Netlify vit dans l'interface. Le constructeur n'en ajoute un que si c'est nécessaire.

## Choix laissés au constructeur

- Outil de conversion des polices et images (par exemple `sharp`, déjà installé).
- Mécanisme exact pour le lien admin : composant client qui interroge `/api/users/me`, ou lien déplacé dans `/admin`. Les deux sont validés par l'utilisateur.
- Réparer ou retirer la parallaxe.
- Choix HC ou LC pour Thunder, en comparant visuellement avec l'existant.
- Découpage des tâches et ordre, tant que la mesure initiale vient en premier.

## Critères d'acceptation

1. `pnpm lint` passe sans erreur ni avertissement.
2. `pnpm build` passe ; dans la sortie, la route `/` est marquée statique ou ISR (symbole `○` ou `●`, pas `ƒ`), de même que `/rankings/[id]` (ISR).
3. Les rapports Lighthouse mobile (accueil et un classement), relevés sur le deploy preview Netlify de la branche, atteignent les cibles du tableau "Objectifs mesurables". Les rapports avant (production) et après (deploy preview) sont joints à la PR. Commande type : `npx lighthouse <url> --form-factor=mobile --only-categories=performance,accessibility --output=json --output-path=<fichier>`.
4. `font-config.css` ne référence plus aucun `.ttf` ni `.otf` (vérifiable par `grep -E "\.(ttf|otf)" -r src/app`), ou n'existe plus au profit de `next/font/local`.
5. Aucun fichier image de plus de 300 Ko n'est importé par le code public (`src/assets/photos`, `src/assets/logo.svg`), et `home-background-phone.JPG` n'est plus dans le dépôt.
6. Dans Chrome DevTools, en émulation mobile aux largeurs 320, 360 et 390 px, aucune section ne provoque de défilement horizontal (vérifiable par `document.documentElement.scrollWidth <= window.innerWidth` dans la console, en haut et en bas de page), sur l'accueil comme sur un classement.
7. Le fondu d'ouverture, le scroll-snap, les photos flottantes et la galerie à deux rangées sont toujours présents. Le contenu est visible sans JavaScript (vérifiable en désactivant JS dans DevTools : le texte du hero s'affiche), et en émulation mobile la page défile au doigt sans blocage, sans retour forcé vers le haut d'une section.
8. Sur mobile, le rang est visible sur chaque ligne du classement sans interaction, et la page de classement ne change pas de mise en page après le chargement (CLS de 0,1 ou moins).
9. Les liens du menu (Notre histoire, Comment participer, etc.) amènent à la bonne section sur mobile, sans que le titre de la section soit masqué par le header.
10. Un administrateur connecté accède toujours à "Importer un classement" (depuis le menu après chargement, ou depuis l'admin Payload) et peut toujours éditer et supprimer une ligne du classement. Après une modification, le classement public sur Netlify est à jour en 60 s au plus (vérifié sur le deploy preview).
11. Une deuxième visite de l'accueil sur Netlify est servie depuis le cache : l'en-tête de réponse indique un hit du cache Netlify (`cache-status` contenant `"Netlify Edge"; hit` ou `"Netlify Durable"; hit`), vérifiable par `curl -sI <url> | grep -i cache-status`.
12. Les images de la galerie et du carrousel passent par Netlify Image CDN (URL en `/_next/image?...` ou `/.netlify/images?...` dans le HTML rendu), vérifiable par `curl -s <url> | grep -c "_next/image\|.netlify/images"` (résultat supérieur à 0).
13. Les dépendances `react-router`, `react-router-dom`, `easy-peasy`, `xlsx`, `react-intl`, `react-dropzone`, `graphql`, `markdown-it` ne figurent plus dans `package.json`, sauf si un usage hors `src/` est découvert (à justifier dans la PR).

## Réconciliation (implémentation vs spec)

### Écarts assumés
- **Lint (critère 1)** : `.eslintrc.cjs` était invalide (`"disabled"`), le lint ne tournait pas. Corrigé en `"off"`. Il reste 8 problèmes préexistants (7 erreurs, 1 avertissement) hors périmètre : `pnpm lint` ne sort donc pas à zéro. Aucun nouveau problème introduit (11 → 8).
- **Dépendances (critère 13)** : `graphql` conservé, c'est un peer requis de `payload`. Retirés en plus : `@std/toml`, `framer-motion`, `@types/markdown-it`.
- **Polices** : Thunder LC uniquement (500, 700, 800) et Obviously 400/500/700 ; Thunder 600 et Obviously 300/800 retirés faute d'usage. Comparaison visuelle HC/LC non faite à l'écran.
- **Logo/images** : `logo.svg` → `logo.webp` (27 Ko), `bg-img.png` → `bg-img.webp` (91 Ko), `arthur-et-romain.png` → `.webp` (51 Ko). Favicon en WebP (support Safari à vérifier).
- **Lien admin** : composant client via `/api/users/me` (hook `useIsAdmin`), partagé avec le tableau de classement pour l'édition/suppression.
- **Classement** : seules 3 colonnes existent (rang, équipe, ELO) depuis un commit antérieur ; l'expansion de ligne mobile, devenue inopérante, est supprimée. V/D/J/WR non recréées.
- **Server action d'upload** : `uploadAction` n'avait aucun contrôle d'accès (défaut préexistant) ; `requireAdmin` y est ajouté (module partagé `src/lib/require-admin.ts`). Un non-admin déclenche une exception au lieu d'un message.
- **Scroll-snap** en `proximity` ; header `fixed`.

### Écarts non assumés / non vérifiés (à traiter sur le deploy preview)
- Aucune mesure Lighthouse « après » (critères 3, 6, 8, 11, 12) : `.env` local inutilisable, pas de `pnpm build` ni de rendu navigateur. Tâche 11 non faite.
- `/` et `/rankings/[id]` en ISR non confirmés (marqueur de build ; `/rankings/[id]` sans `generateStaticParams`, un ID inexistant renvoie 200).
- Fraîcheur : `unstable_cache` 60 s sous ISR 60 s peut servir ~2 min ; les modifications faites dans l'admin Payload n'appellent pas `invalidateRankingsCache` (pas de hook `afterChange`) ; `getSeasons` (60 s) peut abaisser le revalidate de l'accueil à 60 s.
- Fondu sur tout `<main>` : impact sur le LCP à mesurer.
- Débordements : le `overflow-x: clip` sur `body` masque le test `scrollWidth` ; vérifier en comptant les éléments dont `getBoundingClientRect().right > innerWidth`.
- `useInView` (seuil 0.5) ne se déclenche pas pour les sections plus hautes que 2 écrans (préexistant).
- Hook `useIsAdmin` : `isAdmin` passe à vrai après hydratation, léger décalage de la colonne d'actions pour l'admin.
