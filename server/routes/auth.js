const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/signup',              ctrl.signup);
router.post('/login',               ctrl.login);
router.get('/me',        protect,   ctrl.getMe);
router.put('/favoris/:restaurantId', protect, ctrl.toggleFavori);

module.exports = router;
