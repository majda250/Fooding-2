const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/restaurantController');

router.get('/villes',                   ctrl.getVilles);
router.get('/:ville/search',            ctrl.search);
router.get('/:ville/recommendations',   ctrl.getRecommendations);
router.get('/:ville/:id',               ctrl.getById);
router.get('/:ville',                   ctrl.getByVille);

module.exports = router;
