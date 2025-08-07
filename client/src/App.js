import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReservaForm from './componentes/reservaForm';
import ListaReservas from './componentes/listaReservas';
import FieldSelector from './componentes/canchaSelector';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Sistema de Reservas de Canchas</h1>
        <Routes>
          <Route path="/" element={<ListaReservas />} />
          <Route path="/reserva" element={<ReservaForm />} />
          <Route path="/cancha" element={<FieldSelector />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;