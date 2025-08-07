const Cancha = require('./cancha.model');
const Reservas = require('./reservas.model');

// Relación: una reserva pertenece a una cancha
Reservas.belongsTo(Cancha, { foreignKey: 'canchaId' });
Cancha.hasMany(Reservas, { foreignKey: 'canchaId' });

module.exports = {
  Cancha,
  Reservas,
};