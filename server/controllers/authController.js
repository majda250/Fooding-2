const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// POST /api/auth/signup
exports.signup = async (req, res) => {
  try {
    const { nom, email, password } = req.body;
    if (!nom || !email || !password)
      return res.status(400).json({ success: false, message: 'Tous les champs sont requis' });

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ success: false, message: 'Email déjà utilisé' });

    const user = await User.create({ nom, email, password });
    const token = signToken(user._id);

    res.status(201).json({ success: true, token, user });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email et mot de passe requis' });

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect' });

    const token = signToken(user._id);
    res.json({ success: true, token, user });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// GET /api/auth/me
exports.getMe = async (req, res) => {
  res.json({ success: true, user: req.user });
};

// PUT /api/auth/favoris/:restaurantId
exports.toggleFavori = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const id = req.params.restaurantId;
    const idx = user.favoris.indexOf(id);

    if (idx === -1) user.favoris.push(id);
    else user.favoris.splice(idx, 1);

    await user.save();
    res.json({ success: true, favoris: user.favoris });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};
