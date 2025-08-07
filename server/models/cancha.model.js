const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config.js');

class Cancha extends Model {}

Cancha.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ubicacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Cancha',
  tableName: 'canchas',
  timestamps: true,
});

module.exports = Cancha;