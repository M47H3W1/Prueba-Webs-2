import React from 'react';

const CanchaSelector = ({ fields, selectedField, onFieldSelect }) => {
  return (
    <div className="field-selector">
      <label htmlFor="field-select">Select a Field:</label>
      <select
        id="field-select"
        value={selectedField}
        onChange={(e) => onFieldSelect(e.target.value)}
      >
        <option value="">--Choose a field--</option>
        {fields.map((field) => (
          <option key={field.id} value={field.id}>
            {field.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CanchaSelector;