const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

// Modelo Field (sector de la cancha)
const Field = sequelize.define('field', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
});

// Modelo Reservation (reserva)
const Reservation = sequelize.define('reservation', {
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
  }
});

// Relación: una reserva pertenece a un sector
Reservation.belongsTo(Field, { foreignKey: 'fieldId' });
Field.hasMany(Reservation, { foreignKey: 'fieldId' });

module.exports = {
  Sequelize,
  sequelize,
  reservation: Reservation,
  field: Field,
};