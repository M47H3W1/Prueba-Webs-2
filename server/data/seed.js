const { field: Field, reservation: Reservation } = require('../models');

const seedData = async () => {
  const canchas = [
    { name: 'Sector 1' },
    { name: 'Sector 2' },
    { name: 'Sector 3' },
    { name: 'Sector 4' },
  ];

  // Crea los sectores
  await Field.bulkCreate(canchas);

  const reservaciones = [
    { fieldId: 1, startTime: new Date('2023-10-01T10:00:00Z'), endTime: new Date('2023-10-01T12:00:00Z') },
    { fieldId: 1, startTime: new Date('2023-10-01T13:00:00Z'), endTime: new Date('2023-10-01T15:00:00Z') },
    { fieldId: 2, startTime: new Date('2023-10-01T11:00:00Z'), endTime: new Date('2023-10-01T13:00:00Z') },
  ];

  // Crea las reservas
  await Reservation.bulkCreate(reservaciones);
};

module.exports = seedData;