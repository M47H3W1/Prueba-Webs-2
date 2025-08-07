const express = require('express');
const router = express.Router();
const reservasController = require('../controllers/reservas.controller');

// Route to create a new reservation
router.post('/', reservasController.createReservation);

// Route to get all reservations
router.get('/', reservasController.getAllReservations);

// Puedes agregar aquí las demás rutas si tienes los métodos en el controlador
// router.get('/:id', reservasController.getReservationById);
// router.put('/:id', reservasController.updateReservation);
// router.delete('/:id', reservasController.deleteReservation);

module.exports = router;