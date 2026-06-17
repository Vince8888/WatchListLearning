// app/film/[id]/page.js
"use client";
import { useParams } from "next/navigation";
import styles from "./film.module.css";

export default function FilmDetail() {
  const params = useParams();
  const id = params.id;
  const [film, setFilm] = useState(null);

  if (erreur || !film) {
    return (
      <main className="container py-4">
        <p className="alert alert-danger">{erreur}</p>
        <Link href="/">Retour ma liste</Link>
      </main>
    );
  }


  return (
    <main className="container py-4">

    </main>
  );
}
