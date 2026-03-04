import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { restaurantService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';

function Badge({ children, color = 'gray' }) {
  const colors = {
    green: 'bg-green-50 text-green-700',
    blue:  'bg-blue-50 text-blue-700',
    gray:  'bg-secondary text-gray-700',
  };
  return <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${colors[color]}`}>{children}</span>;
}

export default function RestaurantDetail() {
  const { ville, id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading]       = useState(true);
  const [isFavori, setIsFavori]     = useState(false);

  useEffect(() => {
    restaurantService.getById(ville, id)
      .then(r => {
        setRestaurant(r.data.data);
        if (user?.favoris?.includes(r.data.data._id)) setIsFavori(true);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [ville, id, user]);

  const handleFavori = async () => {
    try {
      await authService.toggleFavori(restaurant._id);
      setIsFavori(f => !f);
    } catch (e) { console.error(e); }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30">
      <div className="w-14 h-14 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!restaurant) return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30">
      <div className="text-center">
        <p className="text-xl text-gray-600 mb-4">Restaurant non trouvé</p>
        <Link to="/city-guide" className="text-primary font-semibold hover:underline">← Retour</Link>
      </div>
    </div>
  );

  const mapsUrl = restaurant.latitude && restaurant.longitude
    ? `https://www.google.com/maps/search/?api=1&query=${restaurant.latitude},${restaurant.longitude}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.title + ' ' + (restaurant.address || ''))}`;

  const embedUrl = restaurant.latitude && restaurant.longitude
    ? `https://maps.google.com/maps?q=${restaurant.latitude},${restaurant.longitude}&z=16&output=embed&hl=fr`
    : null;

  return (
    <div className="min-h-screen bg-secondary/30 py-8">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Retour */}
        <Link to="/city-guide" className="inline-flex items-center gap-2 text-primary font-semibold mb-6 hover:gap-3 transition-all">
          ← Retour à la recherche
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Banner */}
          <div className="relative h-64 bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-9xl">🍽️</span>
            {restaurant.rating && (
              <div className="absolute top-5 left-5 bg-white px-4 py-2 rounded-full font-bold text-gray-800 flex items-center gap-1 shadow-lg">
                <span className="text-yellow-500">★</span>
                {restaurant.rating.toFixed(1)}
                {restaurant.ratingCount && <span className="text-gray-400 text-sm ml-1">({restaurant.ratingCount})</span>}
              </div>
            )}
            {isAuthenticated && (
              <button
                onClick={handleFavori}
                className="absolute top-5 right-5 bg-white p-2.5 rounded-full shadow-lg hover:scale-110 transition"
              >
                {isFavori ? '❤️' : '🤍'}
              </button>
            )}
          </div>

          <div className="p-8 space-y-8">
            {/* Titre + badges */}
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{restaurant.title}</h1>
              <div className="flex flex-wrap gap-2">
                {restaurant.halal === 'Oui' && <Badge color="green">🥩 Halal</Badge>}
                {restaurant.Vegetarien      && <Badge color="green">🥗 Végétarien</Badge>}
                {restaurant.enfant          && <Badge color="blue">👶 Adapté enfants</Badge>}
                {restaurant.priceLevel?.map((p, i) => <Badge key={i}>{p}</Badge>)}
              </div>
            </div>

            {/* Grid infos */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-5">
                {restaurant.address && (
                  <div>
                    <h3 className="font-bold text-gray-700 mb-1 flex items-center gap-2">📍 Adresse</h3>
                    <p className="text-gray-600">{restaurant.address}</p>
                  </div>
                )}
                {restaurant.phoneNumber && (
                  <div>
                    <h3 className="font-bold text-gray-700 mb-1">📞 Téléphone</h3>
                    <a href={`tel:${restaurant.phoneNumber}`} className="text-primary font-semibold hover:underline">
                      {restaurant.phoneNumber}
                    </a>
                  </div>
                )}
                {restaurant.type?.length > 0 && (
                  <div>
                    <h3 className="font-bold text-gray-700 mb-2">🕐 Type de repas</h3>
                    <div className="flex flex-wrap gap-2">{restaurant.type.map((t, i) => <Badge key={i}>{t}</Badge>)}</div>
                  </div>
                )}
              </div>

              <div className="space-y-5">
                {restaurant.category?.length > 0 && (
                  <div>
                    <h3 className="font-bold text-gray-700 mb-2">🏷️ Catégories</h3>
                    <div className="flex flex-wrap gap-2">{restaurant.category.map((c, i) => <Badge key={i}>{c.trim()}</Badge>)}</div>
                  </div>
                )}
                {restaurant.ambiance?.length > 0 && (
                  <div>
                    <h3 className="font-bold text-gray-700 mb-2">🎭 Ambiance</h3>
                    <div className="flex flex-wrap gap-2">{restaurant.ambiance.map((a, i) => <Badge key={i}>{a}</Badge>)}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Google Maps embed */}
            {embedUrl ? (
              <div>
                <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">🗺️ Localisation</h3>
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                  <iframe
                    title={`Carte de ${restaurant.title}`}
                    src={embedUrl}
                    width="100%" height="360"
                    style={{ border: 0 }}
                    allowFullScreen loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
                    className="absolute bottom-3 right-3 bg-white text-sm font-semibold px-3 py-1.5 rounded-full shadow border border-gray-200 hover:shadow-md transition flex items-center gap-1">
                    ↗ Ouvrir dans Maps
                  </a>
                </div>
              </div>
            ) : (
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-dark transition shadow">
                🗺️ Voir sur Google Maps
              </a>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
                className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-dark transition shadow flex items-center gap-2">
                🗺️ Itinéraire
              </a>
              {restaurant.phoneNumber && (
                <a href={`tel:${restaurant.phoneNumber}`}
                  className="bg-accent text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition shadow flex items-center gap-2">
                  📞 Appeler
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
