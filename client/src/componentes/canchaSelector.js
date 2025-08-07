import React from 'react';

const CanchaSelector = ({ canchas, canchaSeleccionada, onCanchaSelect }) => {
  return (
    <div className="cancha-selector">
      <label htmlFor="cancha-select">Selecciona una cancha:</label>
      <select
        id="cancha-select"
        value={canchaSeleccionada}
        onChange={(e) => onCanchaSelect(e.target.value)}
      >
        <option value="">--Elige una cancha--</option>
        {canchas.map((cancha) => (
          <option key={cancha.id} value={cancha.id}>
            {cancha.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CanchaSelector;