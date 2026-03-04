// Valeurs exactes issues du dataset réel
const TYPES = ['Petit-Déjeuner', 'Déjeuner', 'Dîner'];

const PRICES = [
  { value: '$',    label: '$ Économique' },
  { value: '$$',   label: '$$ Moyen' },
  { value: '$$$',  label: '$$$ Cher' },
  { value: '$$$$', label: '$$$$ Luxe' },
];

const CATEGORIES = [
  'Boissons','Brunch','Café','Cuisine traditionnelle','Glacier','Pizzeria',
  'Restaurant','Restaurant américain','Restaurant asiatique','Restaurant de fruits de mer',
  'Restaurant de grillades','Restaurant de poisson','Restaurant de poulet',
  'Restaurant de sushis','Restaurant espagnol','Restaurant européen','Restaurant familial',
  'Restaurant fast food','Restaurant français','Restaurant gastronomique',
  'Restaurant international','Restaurant italien','Restaurant libanais',
  'Restaurant marocain','Restaurant méditerranéen','Restaurant mexicain',
  'Restaurant moyen-oriental','Restaurant occidental','Restaurant syrien',
  'Restaurant turc','Sandwicherie','Traiteur',
  
];

const AMBIANCES = [
  'Animé','Branché','Cadre agréable','Calme','Décontracté',
  'Haut de gamme','Historique','Nocturne','Romantique',
  'Rooftop','Tendance','Traditionnel','Vue panoramique','Élégant',
];

// ✅ FIX: onChange reçoit directement la valeur booléenne, pas un event
function Checkbox({ label, checked, onChange }) {
  return (
    <div
      onClick={onChange}
      className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors group select-none"
    >
      <div
        className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${
          checked ? 'bg-primary border-primary' : 'border-gray-300 group-hover:border-primary/60'
        }`}
      >
        {checked && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">{label}</span>
    </div>
  );
}
function Section({ title, children, scrollable }) {
  return (
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">{title}</p>
      <div className={scrollable ? 'max-h-44 overflow-y-auto pr-1 space-y-0.5' : 'space-y-0.5'}>
        {children}
      </div>
    </div>
  );
}

export default function SearchFilters({ filters, setFilters, onSearch, onReset, loading }) {
  // Toggle valeur dans un tableau
  const toggle = (key, value) => {
    const arr = filters[key] || [];
    const next = arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
    setFilters({ ...filters, [key]: next });
  };

  // Nombre de filtres actifs
  const activeCount = [
    ...filters.type,
    ...filters.priceLevel,
    ...filters.category,
    ...filters.ambiance,
    filters.halal      ? ['h'] : [],
    filters.Vegetarien ? ['v'] : [],
    filters.enfant     ? ['e'] : [],
  ].flat().length;

  return (
    <aside className="bg-white rounded-2xl shadow-md p-5 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-800 text-lg">Filtres</h3>
        {activeCount > 0 && (
          <span className="bg-primary text-white text-xs px-2.5 py-1 rounded-full font-bold">
            {activeCount}
          </span>
        )}
      </div>

      {/* Type de repas */}
      <Section title="Type de repas">
        {TYPES.map(t => (
          <Checkbox
            key={t} label={t}
            checked={filters.type.includes(t)}
            onChange={() => toggle('type', t)}
          />
        ))}
      </Section>

      {/* Prix */}
      <Section title="Niveau de prix">
        {PRICES.map(p => (
          <Checkbox
            key={p.value} label={p.label}
            checked={filters.priceLevel.includes(p.value)}
            onChange={() => toggle('priceLevel', p.value)}
          />
        ))}
      </Section>

      {/* Catégorie */}
      <Section title="Catégorie" scrollable>
        {CATEGORIES.map(c => (
          <Checkbox
            key={c} label={c}
            checked={filters.category.includes(c)}
            onChange={() => toggle('category', c)}
          />
        ))}
      </Section>

      {/* Ambiance */}
      <Section title="Ambiance" scrollable>
        {AMBIANCES.map(a => (
          <Checkbox
            key={a} label={a}
            checked={filters.ambiance.includes(a)}
            onChange={() => toggle('ambiance', a)}
          />
        ))}
      </Section>

      {/* Options spéciales */}
      <Section title="Options spéciales">
        <Checkbox
          label="🥩 Halal"
          checked={filters.halal}
          onChange={() => setFilters({ ...filters, halal: !filters.halal })}
        />
        <Checkbox
          label="🥗 Végétarien"
          checked={filters.Vegetarien}
          onChange={() => setFilters({ ...filters, Vegetarien: !filters.Vegetarien })}
        />
        <Checkbox
          label="👶 Adapté aux enfants"
          checked={filters.enfant}
          onChange={() => setFilters({ ...filters, enfant: !filters.enfant })}
        />
      </Section>

      {/* Boutons */}
      <div className="space-y-2 pt-3 border-t border-gray-100">
        <button
          onClick={onSearch}
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading ? (
            <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Recherche...</>
          ) : (
            <>🔍 Rechercher{activeCount > 0 && ` (${activeCount})`}</>
          )}
        </button>
        <button
          onClick={onReset}
          className="w-full border border-gray-200 text-gray-500 py-2.5 rounded-xl text-sm font-semibold hover:bg-secondary/40 transition-colors"
        >
          Réinitialiser
        </button>
      </div>
    </aside>
  );
}
