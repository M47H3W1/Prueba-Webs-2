const db = require('../models');
const Reservation = db.reservation;
const Field = db.field;

// Create a new reservation
exports.createReservation = async (req, res) => {
    try {
        const { fieldId, startTime, endTime } = req.body;

        // Validate overlapping reservations
        const overlappingReservations = await Reservation.findAll({
            where: {
                fieldId: fieldId,
                [db.Sequelize.Op.or]: [
                    {
                        startTime: {
                            [db.Sequelize.Op.lt]: endTime,
                        },
                    },
                    {
                        endTime: {
                            [db.Sequelize.Op.gt]: startTime,
                        },
                    },
                ],
            },
        });

        if (overlappingReservations.length > 0) {
            return res.status(400).json({ message: 'Reservation overlaps with an existing reservation.' });
        }

        const reservation = await Reservation.create({ fieldId, startTime, endTime });
        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({ message: 'Error creating reservation', error });
    }
};

// Get all reservations
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving reservations', error });
    }
};