require('dotenv').config();
const { API_URL, API_KEY } = process.env;
const axios = require('axios');
const { Recipe, Diet } = require('../db');
const { Op } = require('sequelize');

const getAllRecipes = async (req, res) => {
  try {
    const count = await Recipe.count();
    if (count === 0) {
      const { data } = await axios(`${API_URL}/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
      data.results.forEach(async r => {
        const [newRecipe, created] = await Recipe.findOrCreate({
          where: { name: r.title },
          defaults: {
            image: r.image,
            recipe: r.summary.replace( /(<([^>]+)>)/ig, ''),
            dishType: r.dishTypes,
            //score: r?.spoonacularScore,
            healthy: r.healthScore,
            steps: r.analyzedInstructions?.map(s => s.steps?.map((st) => st.step)).flat(),
            price: r.pricePerServing
          }
        });
        r.diets.map(async d => {
          const found = await Diet.findOne({
            attributes: ['id'],
            where: {
              name: d
            }
          });
          newRecipe.addDiets(found?.id);
        })
      });
      return res.json(await Recipe.findAll({
        include: {
          model: Diet,
          through: {
            attributes: []
          }
        },
        order: [['name', 'ASC'], 'id', [Diet, 'id', 'ASC']]
      }));
    }
    res.json(await Recipe.findAll({
      include: {
        model: Diet,
        through: {
          attributes: []
        }
      },
      order: [['name', 'ASC'], 'id', [Diet, 'id', 'ASC']]
    }));
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
}

const getRecipe = async (req, res) => {
  try {
    if (!req.query.name) return res.json({ message: 'Ingresar valor de búsqueda' });
    const query = await Recipe.findAll({
      where: {
        name: {
          [Op.iLike]: `%${req.query.name}%`
        }
      },
      include: {
        model: Diet,
        through: {
          attributes: []
        }
      }
    });
    return query.length > 0 ? res.json(query) : res.json({ message: `Ninguna coincidencia encontrada` });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
}

const getDetailById = async (id) => {
  const detail = await Recipe.findByPk(id, {
    include: {
      model: Diet,
      through: {
        attributes: []
      }
    }
  });
  return detail;
}

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.json({ message: 'Ningún id recibido' });
    const found = await getDetailById(id);
    return found ? res.json(found) : res.json({ message: `Ninguna receta encontrada con el Id = ${id}` });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
}

const postRecipe = async (req, res) => {
  try {
    const { name, image, recipe, dishType, /* score, */ healthy, dietType, steps } = req.body;
    if (!name || !recipe /* || !score */ || !healthy) return res.json({ message: 'Faltan datos' });
    console.log(req.body);
    const [newRecipe, created] = await Recipe.findOrCreate({
      where: {
        name
      },
      defaults: {
        name,
        image,
        recipe,
        dishType,
        /* score, */
        healthy,
        steps,
        created: true
      }
    });
    dietType.map(d => newRecipe.addDiets(d));
    return created ? res.json(await getDetailById(newRecipe.id)) : res.json({ message: 'Receta ya existente en la BD' });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
}

module.exports = {
  getAllRecipes,
  getRecipe,
  getRecipeById,
  postRecipe
};