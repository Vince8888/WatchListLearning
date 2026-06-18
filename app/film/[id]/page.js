// app/film/[id]/page.js
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getMovieDetails, getPosterUrl } from "../../data/tmdb";
import Loader from "../../components/loader/Loader";
import styles from "./film.module.css";

export default function FilmDetail() {
  const params = useParams();
  const id = params.id;
  const [film, setFilm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    getMovieDetails(id)
      .then((data) => {
        setFilm(data);
      })
      .catch(() => {
        setErreur("Film introuvable.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <main className="container py-4">
        <Loader visible={true} />
      </main>
    );
  }

  if (erreur || !film) {
    return (
      <main className="container py-4">
        <p className="alert alert-danger">{erreur}</p>
        <Link href="/">Retour ma liste</Link>
      </main>
    );
  }

  const acteurs = film.credits?.cast?.slice(0, 5) || [];

  return (
    <main className="container py-4">
      <Link href="/" className="d-inline-block mb-3">
        ← Retour à ma liste
      </Link>

      <div className={styles.header}>
        <img
          src={getPosterUrl(film.poster_path)}
          alt={film.title}
          className={styles.poster}
        />
        <div>
          <h1>{film.title}</h1>
          <p className={styles.meta}>
            {film.release_date?.slice(0, 4)} • {film.runtime} min
          </p>
          <p className={styles.genres}>
            {film.genres?.map((g) => g.name).join(", ")}
          </p>
          <p>{film.overview}</p>
        </div>
      </div>

      {acteurs.length > 0 && (
        <>
          <h2 className="mt-4">Casting</h2>
          <ul className={styles.cast}>
            {acteurs.map((acteur) => (
              <li key={acteur.id}>
                {acteur.name} <span className={styles.role}>— {acteur.character}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
