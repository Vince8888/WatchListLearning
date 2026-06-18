// app/components/ratingstars/RatingStars.js
"use client";
import styles from "./ratingstars.module.css";

// Composant contrôlé : la note vient toujours du parent (props `note`),
// et toute interaction passe par `onChange` plutôt que par un state interne.
export default function RatingStars({ note, onChange }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={styles.stars}>
      {stars.map((value) => (
        <span
          key={value}
          className={value <= note ? styles.starFilled : styles.starEmpty}
          onClick={() => onChange(value)}
          role="button"
          aria-label={`Noter ${value} étoile(s)`}
        >
          ★
        </span>
      ))}
    </div>
  );
}
