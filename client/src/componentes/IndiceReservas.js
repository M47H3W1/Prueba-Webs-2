import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './IndiceReservas.css';

const IndiceReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [canchas, setCanchas] = useState([]);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({
    canchaId: '',
    usuarioId: '',
    fecha: '',
    horaInicio: '',
    horaFin: '',
  });
  const [error, setError] = useState('');

  // Cargar reservas y canchas
  const fetchReservas = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/reservas');
      setReservas(res.data);
    } catch (err) {
      setError('Error al obtener las reservas');
    }
  };

  const fetchCanchas = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/canchas');
      setCanchas(res.data);
    } catch (err) {
      setError('Error al obtener las canchas');
    }
  };

  useEffect(() => {
    fetchReservas();
    fetchCanchas();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Enviar formulario (crear o editar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const { canchaId, usuarioId, fecha, horaInicio, horaFin } = form;
    if (!canchaId || !usuarioId || !fecha || !horaInicio || !horaFin) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    // Validar fecha no pasada
    const hoy = new Date();
    const fechaSeleccionada = new Date(`${fecha}T00:00`);
    hoy.setHours(0,0,0,0);
    if (fechaSeleccionada < hoy) {
      setError('No puedes reservar en fechas pasadas.');
      return;
    }

    // Validar horas
    const inicio = new Date(`${fecha}T${horaInicio}`);
    const fin = new Date(`${fecha}T${horaFin}`);
    if (inicio >= fin) {
      setError('La hora de inicio debe ser menor que la hora de fin.');
      return;
    }

    // Validar máximo 2 horas
    const diffHoras = (fin - inicio) / (1000 * 60 * 60);
    if (diffHoras > 2) {
      setError('La reserva no puede ser mayor a 2 horas.');
      return;
    }

    try {
      if (editando) {
        await axios.put(`http://localhost:8000/api/reservas/${editando.id}`, {
          canchaId,
          usuarioId,
          horaInicio: inicio,
          horaFin: fin,
        });
      } else {
        await axios.post('http://localhost:8000/api/reservas', {
          canchaId,
          usuarioId,
          horaInicio: inicio,
          horaFin: fin,
        });
      }
      setForm({ canchaId: '', usuarioId: '', fecha: '', horaInicio: '', horaFin: '' });
      setEditando(null);
      fetchReservas();
    } catch (err) {
      setError('Error al guardar la reserva: ' + (err.response?.data?.message || err.message));
    }
  };

  // Editar reserva
  const handleEditar = (reserva) => {
    setEditando(reserva);
    const inicio = new Date(reserva.horaInicio);
    const fin = new Date(reserva.horaFin);
    setForm({
      canchaId: reserva.canchaId,
      usuarioId: reserva.usuarioId,
      fecha: inicio.toISOString().slice(0, 10),
      horaInicio: inicio.toTimeString().slice(0, 5),
      horaFin: fin.toTimeString().slice(0, 5),
    });
  };

  // Eliminar reserva
  const handleEliminar = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar esta reserva?')) {
      try {
        await axios.delete(`http://localhost:8000/api/reservas/${id}`);
        fetchReservas();
      } catch (err) {
        setError('Error al eliminar la reserva');
      }
    }
  };

  // Cancelar edición
  const handleCancelar = () => {
    setEditando(null);
    setForm({ canchaId: '', usuarioId: '', fecha: '', horaInicio: '', horaFin: '' });
    setError('');
  };

  // Obtener fecha mínima para el input date (hoy)
  const minDate = new Date().toISOString().slice(0, 10);

  return (
    <div className="indice-reservas-container">
      <h2>Gestión de Reservas</h2>
      <form className="form-reserva" onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <div>
          <label>Cancha:</label>
          <select
            name="canchaId"
            value={form.canchaId}
            onChange={handleChange}
          >
            <option value="">Seleccione una cancha</option>
            {canchas.map((cancha) => (
              <option key={cancha.id} value={cancha.id}>
                {cancha.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>ID de usuario:</label>
          <input type="number" name="usuarioId" value={form.usuarioId} onChange={handleChange} />
        </div>
        <div>
          <label>Fecha:</label>
          <input
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            min={minDate}
          />
        </div>
        <div>
          <label>Hora de inicio:</label>
          <input type="time" name="horaInicio" value={form.horaInicio} onChange={handleChange} />
        </div>
        <div>
          <label>Hora de fin:</label>
          <input type="time" name="horaFin" value={form.horaFin} onChange={handleChange} />
        </div>
        <button type="submit">{editando ? 'Actualizar' : 'Reservar'}</button>
        {editando && <button type="button" className="btn-cancelar" onClick={handleCancelar}>Cancelar</button>}
      </form>
      <h3>Reservas existentes</h3>
      <ul className="lista-reservas">
        {reservas.map((reserva) => (
          <li key={reserva.id}>
            <span>
              Cancha: {canchas.find(c => c.id === reserva.canchaId)?.nombre || reserva.canchaId} | Usuario: {reserva.usuarioId} |{' '}
              {new Date(reserva.horaInicio).toLocaleString()} - {new Date(reserva.horaFin).toLocaleString()}
            </span>
            <button className="btn-editar" onClick={() => handleEditar(reserva)}>Editar</button>
            <button className="btn-eliminar" onClick={() => handleEliminar(reserva.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndiceReservas;