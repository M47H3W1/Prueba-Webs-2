import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './listaReservas.css';

const ListaReservas = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/reservas');
        setReservas(response.data);
      } catch (error) {
        console.error('Error al obtener las reservas:', error);
      }
    };

    fetchReservas();
  }, []);

  return (
    <div className="lista-reservas-container">
      <h2>Lista de reservas</h2>
      <ul className="lista-reservas">
        {reservas.map((reserva) => (
          <li key={reserva.id}>
            Cancha: {reserva.canchaId} | Usuario: {reserva.usuarioId} | 
            {new Date(reserva.horaInicio).toLocaleString()} - {new Date(reserva.horaFin).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaReservas;