import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListaReservas = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('/api/reservations');
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div>
      <h2>Reservation List</h2>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            {reservation.fieldName} - {reservation.date} at {reservation.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaReservas;