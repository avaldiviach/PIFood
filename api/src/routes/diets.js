const { Router } = require('express');
const router = Router();
const { getDiets } = require('../controllers/diets');

router.get('/', getDiets);

module.exports = router;

