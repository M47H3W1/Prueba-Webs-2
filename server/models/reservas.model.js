const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config.js');

class Reservas extends Model {}

Reservas.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  canchaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  horaInicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  horaFin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Reservas',
  tableName: 'reservas',
  timestamps: true,
});

// Method to check for overlapping reservations
Reservas.prototype.isOverlapping = function(newStartTime, newEndTime) {
  return (this.horaInicio < newEndTime && newStartTime < this.horaFin);
};

module.exports = Reservas;