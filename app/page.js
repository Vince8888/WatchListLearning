// app/page.js
"use client";
import { useState, useEffect } from "react";
import MovieCard from "./components/moviecard/MovieCard";
import styles from "./page.module.css";
import { useWatchlist } from "../app/context/StorageListContext";

export default function Home() {
  const { watchlist, setWatchlist } = useWatchlist();
  // const [watchlist, setWatchlist] = useState([]);
  const [filtre, setFiltre] = useState("tous");
  const [isLoaded, setIsLoaded] = useState(false);

  // Chargement initial depuis le localStorage 
  useEffect(() => {
    const saved = localStorage.getItem("watchlist");
    if (saved) {
      setWatchlist(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  // Sauvegarde à chaque modification de la watchlist
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }
  }, [watchlist, isLoaded]);

  const toggleStatut = (id) => {
    setWatchlist(
      watchlist.map((film) => film.id === id ? { ...film, statut: film.statut === "vu" ? "a-voir" : "vu" } : film)
    );
  };

  const rateMovie = (id, note) => {
    setWatchlist(
      watchlist.map((film) => (film.id === id ? { ...film, note } : film))
    );
  };

  const deleteMovie = (id) => {
    setWatchlist(watchlist.filter((film) => film.id !== id));
  };

  // Dérivation : on ne stocke jamais la liste filtrée, on la recalcule à chaque rendu
  const filtered =
    filtre === "tous" ? watchlist : watchlist.filter((f) => f.statut === filtre);

  return (
    <main className="container py-4">
      <h1 className="mb-4">Ma watchlist</h1>

      <div className="btn-group mb-4">
        <button
          className={`btn ${filtre === "tous" ? "btn-dark" : "btn-outline-dark"}`}
          onClick={() => setFiltre("tous")}
        >
          Tous
        </button>
        <button
          className={`btn ${filtre === "a-voir" ? "btn-dark" : "btn-outline-dark"}`}
          onClick={() => setFiltre("a-voir")}
        >
          À voir
        </button>
        <button
          className={`btn ${filtre === "vu" ? "btn-dark" : "btn-outline-dark"}`}
          onClick={() => setFiltre("vu")}
        >
          Vus
        </button>
      </div>

      {isLoaded && filtered.length === 0 && (
        <p className={styles.empty}>
          Aucun film dans cette liste. Va en{" "}
          <a href="/recherche">ajouter depuis la recherche</a> !
        </p>
      )}

      {
        filtered.map((film) => (
          <MovieCard
            key={film.id}
            movie={film}
            onToggleStatut={toggleStatut}
            onRate={rateMovie}
            onDelete={deleteMovie}
          />
        ))
      }
    </main>
  );
}

// import {
//   useWatchlist
// } from "../context/WatchlistContext";

// export default function Home() {

//   const { watchlist } =
//     useWatchlist();

//   return (
//     <>
//       {watchlist.map((movie) => (
//         <div key={movie.id}>
//           {movie.title}
//         </div>
//       ))}
//     </>
//   );
// }
