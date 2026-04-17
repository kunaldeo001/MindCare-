"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Restaurant } from "@/lib/data";

interface FavoritesContextType {
    favorites: Restaurant[];
    isFavorite: (id: string) => boolean;
    toggleFavorite: (restaurant: Restaurant) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<Restaurant[]>([]);

    useEffect(() => {
        // Load favorites from local storage
        const savedFavorites = localStorage.getItem("foodfetch-favorites");
        if (savedFavorites) {
            try {
                setFavorites(JSON.parse(savedFavorites));
            } catch (e) {
                console.error("Failed to parse favorites", e);
            }
        }
    }, []);

    useEffect(() => {
        // Save favorites to local storage
        localStorage.setItem("foodfetch-favorites", JSON.stringify(favorites));
    }, [favorites]);

    const isFavorite = (id: string) => {
        return favorites.some((fav) => fav.id === id);
    };

    const toggleFavorite = (restaurant: Restaurant) => {
        setFavorites((prev) => {
            const exists = prev.some((fav) => fav.id === restaurant.id);
            if (exists) {
                return prev.filter((fav) => fav.id !== restaurant.id);
            } else {
                return [...prev, restaurant];
            }
        });
    };

    return (
        <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
}
