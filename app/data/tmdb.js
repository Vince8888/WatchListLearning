// app/data/tmdb.js

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";

export function getPosterUrl(posterPath) {
  if (!posterPath) return "/images/no-poster.png";
  return `${IMAGE_BASE_URL}${posterPath}`;
}

export function searchMovies(query) {
  return fetch(`${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}&language=fr-FR`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Erreur lors de la recherche de films");
      }
      return res.json();
    })
    .then((data) => data.results);
}

export function getMovieDetails(id) {
  return fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR&append_to_response=credits`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Erreur lors de la récupération du film");
      }
      return res.json();
    })
    .then((data) => data);
}

