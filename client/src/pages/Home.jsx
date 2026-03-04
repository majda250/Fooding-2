import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5EFE7] via-[#E8DCC8] to-[#D4C4B0] overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        {/* Blobs décoratifs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary opacity-10 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent opacity-10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur px-5 py-2.5 rounded-full border border-primary/20 shadow text-sm font-semibold text-primary">
            ✨ Propulsé par l'IA
          </div>

          <h1 className="text-5xl md:text-7xl font-black font-display leading-tight">
            <span className="text-dark">Découvrez</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              l'Excellence Culinaire
            </span>
          </h1>

          <p className="text-xl text-primary/70 max-w-2xl mx-auto leading-relaxed">
            Explorez les meilleurs restaurants de Rabat et Tanger. Filtrez par ambiance, cuisine, prix et bien plus.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link to="/city-guide"
              className="px-10 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-xl">
              Explorer les restaurants →
            </Link>
            <Link to="/signup"
              className="px-10 py-4 bg-white/80 backdrop-blur border-2 border-primary/30 text-primary rounded-2xl font-bold text-lg hover:bg-white transition shadow-lg">
              Créer un compte
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-12">
            {[
              { n: '500+', l: 'Restaurants' },
              { n: '2 villes', l: 'Rabat & Tanger' },
              { n: '4.9★', l: 'Note moyenne' },
            ].map((s, i) => (
              <div key={i} className="bg-white/80 backdrop-blur rounded-2xl p-5 shadow-lg border border-primary/10 hover:scale-105 transition-transform">
                <div className="text-2xl font-black text-primary">{s.n}</div>
                <div className="text-sm text-gray-500 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-dark font-display mb-16">
            Pourquoi choisir <span className="text-primary">FOODING</span> ?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🔍', title: 'Recherche Intelligente', desc: 'Filtres avancés par type, prix, ambiance, halal, végétarien et plus encore.' },
              { icon: '📍', title: 'Localisation Précise', desc: 'Carte Google Maps intégrée directement dans chaque fiche restaurant.' },
              { icon: '⭐', title: 'Recommandations', desc: 'Les meilleurs restaurants sélectionnés par notre système de notation.' },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-lg border border-primary/10 hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold text-dark mb-2">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-primary to-accent p-1 rounded-3xl shadow-2xl">
            <div className="bg-[#F5EFE7] rounded-[calc(1.5rem-1px)] p-12 space-y-6">
              <h2 className="text-4xl font-bold text-dark font-display">
                Prêt à découvrir ?
              </h2>
              <p className="text-gray-500 text-lg">Rejoignez FOODING et trouvez votre prochain restaurant favori</p>
              <Link to="/city-guide"
                className="inline-block px-10 py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-dark transition shadow-xl">
                Commencer l'exploration →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
