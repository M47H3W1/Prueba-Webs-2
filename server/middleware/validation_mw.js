const validateReservationOverlap = (reservations) => {
  return (req, res, next) => {
    const { horaInicio, horaFin } = req.body;

    for (let reservation of reservations) {
      if (
        (horaInicio >= reservation.horaInicio && horaInicio < reservation.horaFin) ||
        (horaFin > reservation.horaInicio && horaFin <= reservation.horaFin) ||
        (horaInicio <= reservation.horaInicio && horaFin >= reservation.horaFin)
      ) {
        return res.status(400).json({ message: "Reservation time overlaps with an existing reservation." });
      }
    }

    next();
  };
};

module.exports = { validateReservationOverlap };