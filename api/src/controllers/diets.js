const { Diet } = require('../db');
const diets = require('../resources/diets');

const getDiets = async (req, res) => {
  try {
    const query = await Diet.findOne({ where: { name: "paleo" } });
    if (!query) {
      const objDiets = diets.map(d => ({ name: d }));
      Diet.bulkCreate(objDiets);
      return res.json(await Diet.findAll());
    }
    res.json(await Diet.findAll());
  } catch (e) {
    res.json({ message: e.message });
  }
}

module.exports = {
  getDiets
}