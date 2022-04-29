const { DataTypes } = require('sequelize');
// Exportamos una función que define el modelo
// Luego le inyectamos la conexión a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      validate: {
        isUrl: true
      }
    },
    recipe: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dishType: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    healthy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
  created: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  } 
  },
  {
    timestamps: false
  }
  );
};
