require('dotenv').config();
const { API_URL, API_KEY } = process.env;
const axios = require('axios');
const { Recipe, Diet } = require('../db');
const { Op } = require('sequelize');

const getAllRecipes = async (req, res) => {
  try {
    const count = await Recipe.count();
    if (count === 0) {
      const { data } = await axios(`${API_URL}/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=3`);
      data.results.forEach(async r => {
        //const steps = await r.analyzedInstructions.steps;
        //console.log(steps);
        const [newRecipe, created] = await Recipe.findOrCreate({
          where: { name: r.title },
          defaults: {
            image: r.image,
            recipe: r.summary,
            dishType: r.dishTypes,
            score: r.spoonacularScore,
            healthy: r.healthScore
            //steps: r.analyzedInstructions?.steps?.map({ step } = step)
          }
        });
        r.diets.map(async d => {
          const found = await Diet.findOne({
            attributes: ['id'],
            where: {
              name: d
            }
          });
          newRecipe.addDiets(found.id);
        })
      });
      return res.json(await Recipe.findAll({
        include: {
          model: Diet,
          through: {
            attributes: []
          }
        },
        order: ['id', [Diet, 'id', 'ASC']]
      }));
    }
    res.json(await Recipe.findAll({
      include: {
        model: Diet,
        through: {
          attributes: []
        }
      },
      order: ['id', [Diet, 'id', 'ASC']]
    }));
  } catch (e) {
    res.json({ message: e.message });
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
      }
    });
    return query.length > 0 ? res.json(query) : res.json({ message: "Ninguna coincidencia encontrada" });
  } catch (e) {
    res.json({ message: e.message });
  }
}

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.json({ message: 'Ningún id recibido' });
    const detail = await Recipe.findByPk(id, {
      include: {
        model: Diet,
        through: {
          attributes: []
        }
      }
    });
    return detail ? res.json(detail) : res.json({ message: 'Ninguna receta encontrada con el id proporcionado' });
  } catch (e) {
    res.json({ message: e.message });
  }
}

const postRecipe = async (req, res) => {
  try {
    const { name, image, recipe, dishType, score, healthy, dietType } = req.body;
    if (!name || !recipe || !score || !healthy) return res.json({ message: 'Faltan datos' });
    const [newRecipe, created] = await Recipe.findOrCreate({
      where: {
        name
      },
      defaults: {
        ...req.body,
        created: true
      }
    });
    dietType.map(d => newRecipe.addDiets(d));
    return created ? res.json({message: 'Receta creada satisfactoriamente'}) : res.json({message: 'Receta ya existente en la BD'});
  } catch (e) {
    res.json({ message: e.message });
  }
}

module.exports = {
  getAllRecipes,
  getRecipe,
  getRecipeById,
  postRecipe
};