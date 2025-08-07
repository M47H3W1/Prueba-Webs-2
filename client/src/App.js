import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndiceReservas from './componentes/IndiceReservas';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Sistema de Reservas de Canchas</h1>
        <Routes>
          <Route path="/" element={<IndiceReservas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;