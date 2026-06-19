"use client";
import { createContext, useContext, useEffect, useState, } from "react";

const WatchlistContext = createContext();

export function WatchlistProvider({ children, }) {
    const [watchlist, setWatchlist] = useState([]);

    // Chargement initial
    useEffect(() => {
        const saved = localStorage.getItem("watchlist");

        if (saved) {
            setWatchlist(JSON.parse(saved));
        }
    }, []);

    // Sauvegarde automatique
    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }, [watchlist]);

    const addMovie = (movie) => {
        setWatchlist((prev) => {
            const exists = prev.some((m) => m.id === movie.id);
            return exists ? prev : [...prev, { ...movie, statut: "a-voir" }];
        });
    };

    const removeMovie = (id) => {
        setWatchlist(() => watchlist.filter((movie) => movie.id !== id));
    };

    return (
        <WatchlistContext.Provider
            value={{
                watchlist,
                setWatchlist,
                addMovie,
                removeMovie,
            }}
        >
            {children}
        </WatchlistContext.Provider>
    );
}

export function useWatchlist() {
    return useContext(WatchlistContext);
}