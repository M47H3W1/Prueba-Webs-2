import React, { useState } from 'react';
import axios from 'axios';
import './reservaForm.css';

const ReservaForm = () => {
  const [canchaId, setCanchaId] = useState('');
  const [usuarioId, setUsuarioId] = useState('');
  const [fecha, setFecha] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!canchaId || !usuarioId || !fecha || !horaInicio || !horaFin) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const inicio = new Date(`${fecha}T${horaInicio}`);
    const fin = new Date(`${fecha}T${horaFin}`);

    if (inicio >= fin) {
      setError('La hora de fin debe ser posterior a la hora de inicio.');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/reservas', {
        canchaId,
        usuarioId,
        horaInicio: inicio,
        horaFin: fin,
      });
      alert('¡Reserva creada exitosamente!');
      setCanchaId('');
      setUsuarioId('');
      setFecha('');
      setHoraInicio('');
      setHoraFin('');
    } catch (err) {
      setError('Error al crear la reserva: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-reserva">
      <h2>Reservar una cancha</h2>
      {error && <p className="error">{error}</p>}
      <div>
        <label>ID de cancha:</label>
        <input
          type="number"
          value={canchaId}
          onChange={(e) => setCanchaId(e.target.value)}
        />
      </div>
      <div>
        <label>ID de usuario:</label>
        <input
          type="number"
          value={usuarioId}
          onChange={(e) => setUsuarioId(e.target.value)}
        />
      </div>
      <div>
        <label>Fecha:</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
      </div>
      <div>
        <label>Hora de inicio:</label>
        <input
          type="time"
          value={horaInicio}
          onChange={(e) => setHoraInicio(e.target.value)}
        />
      </div>
      <div>
        <label>Hora de fin:</label>
        <input
          type="time"
          value={horaFin}
          onChange={(e) => setHoraFin(e.target.value)}
        />
      </div>
      <button type="submit">Reservar</button>
    </form>
  );
};

export default ReservaForm;