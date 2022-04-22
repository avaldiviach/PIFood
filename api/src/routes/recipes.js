const { Router } = require('express');
const { getAllRecipes, getRecipe, getRecipeById, postRecipe } = require('../controllers/recipes')

const router = Router();

router.get('/all', getAllRecipes);
router.get('/', getRecipe);
router.get('/:id', getRecipeById);
router.post('/',postRecipe);


module.exports = router;