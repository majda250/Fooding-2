const mongoose = require('mongoose');

// Cache des modèles dynamiques par collection (Rabat, Tanger, etc.)
const modelCache = {};

function getCollectionModel(collectionName) {
  if (modelCache[collectionName]) return modelCache[collectionName];
  const model = mongoose.model(
    `Col_${collectionName}`,
    new mongoose.Schema({}, { strict: false }),
    collectionName
  );
  modelCache[collectionName] = model;
  return model;
}

function resolveCollection(ville) {
  if (!ville) return null;
  const v = ville.toLowerCase().trim();
  if (v.includes('rabat'))  return 'Rabat';
  if (v.includes('tanger')) return 'Tanger';
  return null;
}

// Construction de la query filtre - $in direct sur les tableaux
function buildQuery(filters) {
  const q = {};

  if (filters.type) {
    const arr = Array.isArray(filters.type) ? filters.type : [filters.type];
    if (arr.length) q.type = { $in: arr };
  }
  if (filters.priceLevel) {
    const arr = Array.isArray(filters.priceLevel) ? filters.priceLevel : [filters.priceLevel];
    if (arr.length) q.priceLevel = { $in: arr };
  }
  if (filters.category) {
    const arr = Array.isArray(filters.category) ? filters.category : [filters.category];
    if (arr.length) q.category = { $in: arr };
  }
  if (filters.ambiance) {
    const arr = Array.isArray(filters.ambiance) ? filters.ambiance : [filters.ambiance];
    if (arr.length) {
      q.$or = [
        { ambiance: { $in: arr } },
        { 'ambiance ': { $in: arr } }, // champ avec espace parasite dans les données
      ];
    }
  }
  if (filters.halal === 'true' || filters.halal === true)           q.halal = 'Oui';
  if (filters.Vegetarien === 'true' || filters.Vegetarien === true) q.Vegetarien = true;
  if (filters.vegetarien === 'true' || filters.vegetarien === true) q.Vegetarien = true;
  if (filters.enfant === 'true' || filters.enfant === true)         q.enfant = true;

  return q;
}

// GET /api/restaurants/villes
exports.getVilles = (req, res) => {
  res.json({ success: true, data: ['Rabat', 'Tanger'] });
};

// GET /api/restaurants/:ville
exports.getByVille = async (req, res) => {
  try {
    const col = resolveCollection(req.params.ville);
    if (!col) return res.status(400).json({ success: false, message: 'Ville inconnue' });

    const Model = getCollectionModel(col);
    const data = await Model.find().sort({ rating: -1 }).limit(100).lean();
    res.json({ success: true, count: data.length, data });
  } catch (e) {
    console.error('getByVille:', e.message);
    res.json({ success: true, count: 0, data: [] });
  }
};

// GET /api/restaurants/:ville/search?type=...&priceLevel=...
exports.search = async (req, res) => {
  try {
    const col = resolveCollection(req.params.ville);
    if (!col) return res.status(400).json({ success: false, message: 'Ville inconnue' });

    const query = buildQuery(req.query);
    console.log(`🔍 [${col}] query:`, JSON.stringify(query));

    const Model = getCollectionModel(col);
    const data = await Model.find(query).sort({ rating: -1 }).limit(100).lean();
    console.log(`✅ ${data.length} résultat(s)`);
    res.json({ success: true, count: data.length, data });
  } catch (e) {
    console.error('search:', e.message);
    res.json({ success: true, count: 0, data: [] });
  }
};

// GET /api/restaurants/:ville/recommendations
exports.getRecommendations = async (req, res) => {
  try {
    const col = resolveCollection(req.params.ville);
    if (!col) return res.json({ success: true, count: 0, data: [] });

    const Model = getCollectionModel(col);
    const data = await Model.find({ rating: { $gte: 4.0 } })
      .sort({ rating: -1, ratingCount: -1 })
      .limit(6).lean();
    res.json({ success: true, count: data.length, data });
  } catch (e) {
    res.json({ success: true, count: 0, data: [] });
  }
};

// GET /api/restaurants/:ville/:id
exports.getById = async (req, res) => {
  try {
    const col = resolveCollection(req.params.ville);
    if (!col) return res.status(400).json({ success: false, message: 'Ville inconnue' });

    const Model = getCollectionModel(col);
    const restaurant = await Model.findById(req.params.id).lean();
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant non trouvé' });
    res.json({ success: true, data: restaurant });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};
