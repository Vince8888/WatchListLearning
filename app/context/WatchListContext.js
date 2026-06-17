// 1. Créer le contexte (dans un fichier séparé, ex. app/context/WatchlistContext.js)
"use client";
import { createContext, useContext, useState } from "react";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {

}

// Hook personnalisé pour consommer le contexte plus simplement
export function useWatchlist() {
    return useContext(WatchlistContext);
}