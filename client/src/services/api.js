import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Injecter le token automatiquement
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── Restaurants ────────────────────────────────────────────────────────────

export const restaurantService = {
  getVilles: () =>
    api.get('/restaurants/villes'),

  getByVille: (ville) =>
    api.get(`/restaurants/${ville}`),

  search: (ville, filters) => {
    const params = new URLSearchParams();
    if (filters.type?.length)       filters.type.forEach(v => params.append('type', v));
    if (filters.priceLevel?.length) filters.priceLevel.forEach(v => params.append('priceLevel', v));
    if (filters.category?.length)   filters.category.forEach(v => params.append('category', v));
    if (filters.ambiance?.length)   filters.ambiance.forEach(v => params.append('ambiance', v));
    if (filters.halal)      params.append('halal', 'true');
    if (filters.Vegetarien) params.append('Vegetarien', 'true');
    if (filters.enfant)     params.append('enfant', 'true');
    return api.get(`/restaurants/${ville}/search?${params}`);
  },

  getRecommendations: (ville) =>
    api.get(`/restaurants/${ville}/recommendations`),

  getById: (ville, id) =>
    api.get(`/restaurants/${ville}/${id}`),
};

// ─── Auth ────────────────────────────────────────────────────────────────────

export const authService = {
  signup:     (data)  => api.post('/auth/signup', data),
  login:      (data)  => api.post('/auth/login', data),
  getMe:      ()      => api.get('/auth/me'),
  toggleFavori: (id)  => api.put(`/auth/favoris/${id}`),
};

export default api;
