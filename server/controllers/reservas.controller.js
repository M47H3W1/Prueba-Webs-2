const { Reservas, Cancha } = require('../models');
const { Op } = require('sequelize');

// Crear una nueva reserva
exports.createReservation = async (req, res) => {
    try {
        const { canchaId, usuarioId, horaInicio, horaFin } = req.body;

        // Validar solapamiento de reservas
        const overlappingReservations = await Reservas.findAll({
            where: {
                canchaId: canchaId,
                [Op.or]: [
                    {
                        horaInicio: {
                            [Op.lt]: horaFin,
                        },
                    },
                    {
                        horaFin: {
                            [Op.gt]: horaInicio,
                        },
                    },
                ],
            },
        });

        if (overlappingReservations.length > 0) {
            return res.status(400).json({ message: 'La reserva se solapa con una existente.' });
        }

        const reserva = await Reservas.create({ canchaId, usuarioId, horaInicio, horaFin });
        res.status(201).json(reserva);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la reserva', error });
    }
};

// Obtener todas las reservas
exports.getAllReservations = async (req, res) => {
    try {
        const reservas = await Reservas.findAll();
        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las reservas', error });
    }
};