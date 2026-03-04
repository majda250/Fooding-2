import { Link } from 'react-router-dom';

export default function RestaurantCard({ restaurant, ville, isRecommendation }) {
  const ambiance = restaurant.ambiance?.length
    ? restaurant.ambiance.join(', ')
    : restaurant['ambiance ']?.join(', ') || '';

  return (
    <Link
      to={`/restaurant/${ville}/${restaurant._id}`}
      className={`block bg-white rounded-2xl shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden ${
        isRecommendation ? 'ring-2 ring-primary' : ''
      }`}
    >
      {/* Banner */}
      <div className="relative h-44 bg-gradient-to-br from-primary to-accent flex items-center justify-center">
        <span className="text-6xl">🍽️</span>
        {isRecommendation && (
          <span className="absolute top-3 right-3 bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold">
            ⭐ Recommandé
          </span>
        )}
        {restaurant.rating && (
          <span className="absolute top-3 left-3 bg-white text-gray-800 text-sm px-3 py-1 rounded-full font-bold shadow">
            ★ {restaurant.rating.toFixed(1)}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-2">
        <h3 className="font-bold text-gray-800 text-lg leading-tight line-clamp-1">
          {restaurant.title}
        </h3>

        {restaurant.address && (
          <p className="text-gray-500 text-sm line-clamp-1 flex items-center gap-1">
            <span>📍</span> {restaurant.address}
          </p>
        )}

        {restaurant.priceLevel?.length > 0 && (
          <p className="text-primary font-semibold text-sm">
            {restaurant.priceLevel.join(' · ')}
          </p>
        )}

        {restaurant.category?.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {restaurant.category.slice(0, 2).map((c, i) => (
              <span key={i} className="bg-secondary text-gray-700 text-xs px-2 py-1 rounded-full">
                {c.trim()}
              </span>
            ))}
            {restaurant.category.length > 2 && (
              <span className="bg-secondary text-gray-500 text-xs px-2 py-1 rounded-full">
                +{restaurant.category.length - 2}
              </span>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-1 pt-2 border-t border-gray-100">
          {restaurant.halal === 'Oui' && (
            <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded font-medium">🥩 Halal</span>
          )}
          {restaurant.Vegetarien && (
            <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded font-medium">🥗 Végétarien</span>
          )}
          {restaurant.enfant && (
            <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded font-medium">👶 Enfants</span>
          )}
          {ambiance && (
            <span className="text-gray-400 text-xs px-2 py-1">🎭 {ambiance}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
