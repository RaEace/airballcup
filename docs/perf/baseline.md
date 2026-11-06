# Mesure de départ (production, 2026-11-06)

Lighthouse mobile (profil par défaut), médiane de 3 passages, avant toute modification.

| Indicateur | Accueil `https://airballcup.com/` | Classement `https://airballcup.com/rankings` | Cible |
|---|---|---|---|
| Performance | 70 | 66 | ≥ 90 |
| Accessibilité | 96 | 84 | pas de régression |
| LCP | 9,39 s | 7,71 s | ≤ 2,5 s |
| CLS | 0 | 0 | ≤ 0,1 |
| TBT | 151 ms | 176 ms | ≤ 200 ms |
| Poids transféré | 26 540 Ko | 1 173 Ko | accueil ≤ 1 Mo au premier affichage |
| Polices téléchargées | 4 (80 Ko) | 3 (60 Ko) | ≤ 4 fichiers, ≤ 200 Ko |

Notes : le poids de l'accueil (26 Mo) inclut les images chargées pendant la simulation Lighthouse (originaux GCS de la galerie/carrousel, fond du hero). Le CLS à 0 vient du contenu masqué (`opacity: 0`) jusqu'à l'hydratation ; à re-vérifier après la tâche 7. Rapports JSON bruts dans le scratchpad de session, non versionnés.
