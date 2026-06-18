// app/components/moviecard/MovieCard.js
"use client";
import Link from "next/link";
import { FaPlus, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";
import { getPosterUrl } from "../../data/tmdb";
import RatingStars from "../ratingstars/RatingStars";
import styles from "./moviecard.module.css";

export default function MovieCard({ movie, onAdd, onToggleStatut, onDelete, onRate }) {
  const annee = movie.release_date ? movie.release_date.slice(0, 4) : "—";

  return (
    <div className={styles.card}>
      <Link href={`/film/${movie.id}`} className={styles.posterLink}>
        <img
          src={getPosterUrl(movie.poster_path)}
          alt={movie.title}
          className={styles.poster}
        />
      </Link>

      <div className={styles.info}>
        <Link href={`/film/${movie.id}`} className={styles.title}>
          {movie.title}
        </Link>
        <p className={styles.year}>{annee}</p>

        {/* Mode recherche : bouton ajouter */}
        {onAdd && (
          <button className="btn btn-sm btn-success" onClick={() => onAdd(movie)}>
            <FaPlus className="me-1" /> Ajouter à ma liste
          </button>
        )}

        {/* Mode watchlist : toggle statut + notation + suppression */}
        {onToggleStatut && (
          <div className={styles.watchlistActions}>
            <button
              className={`btn btn-sm ${movie.statut === "vu" ? "btn-secondary" : "btn-outline-secondary"}`}
              onClick={() => onToggleStatut(movie.id)}
            >
              {movie.statut === "vu" ? (
                <>
                  <FaEye className="me-1" /> Vu
                </>
              ) : (
                <>
                  <FaEyeSlash className="me-1" /> À voir
                </>
              )}
            </button>

            <RatingStars note={movie.note || 0} onChange={(value) => onRate(movie.id, value)} />

            <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(movie.id)}>
              <FaTrash />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
