// app/components/searchbar/SearchBar.js
"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./searchbar.module.css";

export default function SearchBar({ onSearch }) {
  const [terme, setTerme] = useState("");

  const handleSubmit = () => {
    if (!terme.trim()) return;
    onSearch(terme);
  };

  return (
    <div className={styles.form} >
      <input
        className={`form-control ${styles.input}`}
        type="text"
        placeholder="Rechercher un film..."
        value={terme}
        onChange={(e) => setTerme(e.target.value)}
      />
      <button onClick={handleSubmit} className="btn btn-outline-success ms-2">
        <FaSearch />
      </button>
    </div>
  );
}
