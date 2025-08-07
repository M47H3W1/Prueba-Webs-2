const { Cancha, Reservas } = require('../models');

const seedData = async () => {
  const canchas = [
    { nombre: 'Sector 1', ubicacion: 'Zona A', capacidad: 10 },
    { nombre: 'Sector 2', ubicacion: 'Zona B', capacidad: 20 },
    { nombre: 'Sector 3', ubicacion: 'Zona C', capacidad: 30 },
    { nombre: 'Sector 4', ubicacion: 'Zona D', capacidad: 40 },
  ];

  await Cancha.bulkCreate(canchas);

  const reservaciones = [
    { canchaId: 1, usuarioId: 1, horaInicio: new Date('2023-10-01T10:00:00Z'), horaFin: new Date('2023-10-01T12:00:00Z') },
    { canchaId: 1, usuarioId: 2, horaInicio: new Date('2023-10-01T13:00:00Z'), horaFin: new Date('2023-10-01T15:00:00Z') },
    { canchaId: 2, usuarioId: 3, horaInicio: new Date('2023-10-01T11:00:00Z'), horaFin: new Date('2023-10-01T13:00:00Z') },
  ];

  await Reservas.bulkCreate(reservaciones);
};

module.exports = seedData;