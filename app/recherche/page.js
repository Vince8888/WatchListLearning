// app/recherche/page.js
"use client";
import { useState } from "react";
import SearchBar from "../components/searchbar/SearchBar";
import MovieCard from "../components/moviecard/MovieCard";
import Loader from "../components/loader/Loader";
import { searchMovies } from "../data/tmdb";
import { useWatchlist } from "../context/StorageListContext";
import styles from "./recherche.module.css";

export default function Recherche() {
  const [resultats, setResultats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [erreur, setErreur] = useState(null);
  const [message, setMessage] = useState(null); // feedback visuel après ajout
  const { addMovie } = useWatchlist();

  const handleSearch = async (terme) => {
    setIsLoading(true);
    setErreur(null);
    try {
      const films = await searchMovies(terme);
      setResultats(films);
    } catch (err) {
      setErreur("Impossible de récupérer les résultats. Réessaie plus tard.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = (movie) => {
    addMovie(movie);
    setMessage(`${movie.title} a bien été ajouté`);
  };

  return (
    <main className="container py-4">
      <h1 className="mb-4">Rechercher un film</h1>
      <SearchBar onSearch={handleSearch} />

      {message && <div className={`alert alert-success ${styles.alert}`}>{message}</div>}
      {erreur && <div className="alert alert-danger">{erreur}</div>}

      <Loader visible={isLoading} />

      {!isLoading &&
        resultats.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onAdd={() => handleAdd(movie)} />
        ))}
    </main>
  );
}

