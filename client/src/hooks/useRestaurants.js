import { useState, useEffect, useCallback } from 'react';
import { restaurantService } from '../services/api';

const EMPTY = { type: [], priceLevel: [], category: [], ambiance: [], halal: false, Vegetarien: false, enfant: false };

export const useRestaurants = (villeInitiale = 'Rabat') => {
  const [ville, setVille]                   = useState(villeInitiale);
  const [villes, setVilles]                 = useState([]);
  const [restaurants, setRestaurants]       = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [filters, setFilters]               = useState(EMPTY);
  const [loading, setLoading]               = useState(true);
  const [searching, setSearching]           = useState(false);

  // Charger les villes une seule fois
  useEffect(() => {
    restaurantService.getVilles()
      .then(r => setVilles(r.data.data))
      .catch(() => setVilles(['Rabat', 'Tanger']));
  }, []);

  // Charger restaurants + recommandations quand la ville change
  const loadAll = useCallback(async (v) => {
    setLoading(true);
    try {
      const [restoRes, recoRes] = await Promise.all([
        restaurantService.getByVille(v),
        restaurantService.getRecommendations(v),
      ]);
      setRestaurants(restoRes.data.data ?? []);
      setRecommendations(recoRes.data.data ?? []);
    } catch {
      setRestaurants([]);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadAll(ville); }, [ville, loadAll]);

  // Recherche avec filtres
  const search = useCallback(async () => {
    setSearching(true);
    try {
      const res = await restaurantService.search(ville, filters);
      setRestaurants(res.data.data ?? []);
    } catch {
      await loadAll(ville);
    } finally {
      setSearching(false);
    }
  }, [ville, filters, loadAll]);

  const resetFilters = useCallback(() => {
    setFilters(EMPTY);
    loadAll(ville);
  }, [ville, loadAll]);

  return {
    ville, setVille, villes,
    restaurants, recommendations,
    filters, setFilters,
    loading, searching,
    search, resetFilters,
  };
};
