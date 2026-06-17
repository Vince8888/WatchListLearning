# CineWatch — Gestionnaire de watchlist de films

Application Next.js permettant de rechercher des films via l'API TMDB et de
constituer sa propre liste de films à regarder, avec notation et statut de
visionnage.

## Setup initial

- [ ] `npm install`
- [ ] Copier `.env.example` en `.env.local`
- [ ] Créer un compte sur [TMDB](https://www.themoviedb.org/settings/api) et
      récupérer une clé API gratuite
- [ ] Coller la clé dans `.env.local` (`NEXT_PUBLIC_TMDB_API_KEY=...`)
- [ ] `npm run dev`

## Étape 1 — Structure & Navbar

- [x] Projet Next.js + Bootstrap installés
- [x] `Navbar` avec `<Link href="/">` et `<Link href="/recherche">`
- [x] Navbar affichée sur toutes les pages via `layout.js`

## Étape 2 — Recherche de films (API)

- [x] `SearchBar` avec input contrôlé (`useState`)
- [x] Appel à l'API TMDB au clic sur "Rechercher"
- [x] Affichage des résultats via `MovieCard`
- [x] `Loader` affiché pendant le chargement

## Étape 3 — Ajouter à la watchlist

- [x] Bouton "+ Ajouter à ma liste" dans `MovieCard`
- [x] Communication enfant → parent via la prop `onAdd`
- [x] Vérification des doublons avant ajout

## Étape 4 — Page d'accueil = watchlist personnelle

- [x] Affichage de la liste des films ajoutés
- [x] Toggle "Vu" / "À voir" (`onToggleStatut`)
- [x] Notation par étoiles (`RatingStars`, composant contrôlé)
- [x] Bouton de suppression (`onDelete`)

## Étape 5 — Filtrage

- [x] Boutons "Tous" / "À voir" / "Vus"
- [x] Filtrage par dérivation (pas de duplication du state)

## Étape 6 — Route dynamique : détail d'un film

- [x] Page `app/film/[id]/page.js`
- [x] Récupération de `params.id`
- [x] Appel API pour les infos complètes (synopsis, durée, casting)

## Étape 7 — Loader

- [x] `react-loader-spinner` installé et utilisé
- [x] Loader affiché pendant la recherche et le chargement du détail

## Étape 8 — Persistance avec localStorage

- [x] Chargement initial depuis `localStorage` (`useEffect` au montage)
- [x] Sauvegarde à chaque modification (`useEffect([watchlist])`)

## Étape 9 — Bonus (non implémenté, à vous de jouer !)

- [ ] Debounce sur la recherche (recherche en direct, `useEffect` + `setTimeout`)
- [ ] Tri de la watchlist (par note, par date d'ajout)
- [ ] Mode sombre (`useState` + variable CSS)

## Arborescence

```
app/
├── page.js                     → Accueil : watchlist personnelle
├── recherche/page.js           → Recherche de films via l'API
├── film/[id]/page.js           → Détail d'un film (route dynamique)
├── components/
│   ├── navbar/Navbar.js
│   ├── moviecard/MovieCard.js
│   ├── searchbar/SearchBar.js
│   ├── ratingstars/RatingStars.js
│   └── loader/Loader.js
└── data/
    └── tmdb.js                 → Centralise les appels à l'API TMDB
```

## Notes techniques

- Tous les composants avec interactivité (`useState`, `useEffect`, gestion
  d'événements) sont marqués `"use client"`.
- La clé API est préfixée `NEXT_PUBLIC_` car elle est utilisée depuis des
  Client Components (donc exposée côté navigateur). Pour une vraie
  application en production, il vaudrait mieux passer par une route API
  Next.js (`app/api/...`) qui garderait la clé strictement côté serveur.
- La liste filtrée (`filtered` dans `app/page.js`) est **dérivée** du state
  `watchlist` à chaque rendu, jamais stockée séparément, pour éviter toute
  désynchronisation entre la liste complète et la liste affichée.
