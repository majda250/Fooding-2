import RestaurantCard from '../components/restaurant/RestaurantCard';
import SearchFilters from '../components/restaurant/SearchFilters';
import { useRestaurants } from '../hooks/useRestaurants';

export default function CityGuide() {
  const {
    ville, setVille, villes,
    restaurants, recommendations,
    filters, setFilters,
    loading, searching,
    search, resetFilters,
  } = useRestaurants();

  // ✅ Déclaré AVANT le return
  const hasActiveFilters =
    filters.type.length > 0 ||
    filters.priceLevel.length > 0 ||
    filters.category.length > 0 ||
    filters.ambiance.length > 0 ||
    filters.halal || filters.Vegetarien || filters.enfant;

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header ville */}
      <div className="bg-white border-b border-secondary py-6 shadow-sm">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-primary font-display italic">
            Découvrez les meilleurs restaurants
          </h1>
          <div className="flex items-center gap-3">
            <label className="text-gray-600 font-medium">Ville :</label>
            <select
              value={ville}
              onChange={e => setVille(e.target.value)}
              className="px-4 py-2 border-2 border-primary/30 rounded-full font-semibold text-gray-700 focus:outline-none focus:border-primary bg-white"
            >
              {villes.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <SearchFilters
              filters={filters}
              setFilters={setFilters}
              onSearch={search}
              onReset={resetFilters}
              loading={searching}
            />
          </div>

          {/* Contenu */}
          <div className="lg:col-span-3 space-y-10">

            {/* Recommandations — cachées si filtres actifs */}
            {!loading && recommendations.length > 0 && !hasActiveFilters && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                  <span className="text-2xl">⭐</span> Nos recommandations
                </h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {recommendations.map(r => (
                    <RestaurantCard key={r._id} restaurant={r} ville={ville} isRecommendation />
                  ))}
                </div>
              </section>
            )}

            {/* Tous les restaurants */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold text-gray-800">
                  {hasActiveFilters ? 'Résultats' : 'Tous les restaurants'}
                  <span className="ml-2 text-lg text-gray-400 font-normal">({restaurants.length})</span>
                </h2>
              </div>

              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : restaurants.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-5">
                  {restaurants.map(r => (
                    <RestaurantCard key={r._id} restaurant={r} ville={ville} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-16 text-center shadow">
                  <div className="text-5xl mb-4">🍽️</div>
                  <p className="text-gray-500 text-lg mb-2">Aucun restaurant trouvé</p>
                  <p className="text-gray-400 text-sm mb-6">Essayez de modifier vos filtres</p>
                  <button onClick={resetFilters} className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-dark transition">
                    Réinitialiser
                  </button>
                </div>
              )}
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}