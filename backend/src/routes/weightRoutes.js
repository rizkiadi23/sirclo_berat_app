const express = require('express');
const router = express.Router();
const {
  getWeights,
  getWeight,
  createWeight,
  updateWeight,
  deleteWeight,
  getWeightStats,
} = require('../controllers/weightController');

router.get('/', getWeights);
router.get('/statistics', getWeightStats);
router.get('/:id', getWeight);
router.post('/', createWeight);
router.put('/:id', updateWeight);
router.delete('/:id', deleteWeight);

module.exports = router;
