import React, { useState } from 'react';
import axios from 'axios';

const ReservaForm = () => {
  const [fieldId, setFieldId] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!fieldId || !date || !startTime || !endTime) {
      setError('All fields are required.');
      return;
    }

    if (new Date(startTime) >= new Date(endTime)) {
      setError('End time must be after start time.');
      return;
    }

    try {
      const response = await axios.post('/api/reservations', {
        fieldId,
        date,
        startTime,
        endTime,
      });
      alert('Reservation created successfully!');
      // Reset form fields
      setFieldId('');
      setDate('');
      setStartTime('');
      setEndTime('');
    } catch (err) {
      setError('Error creating reservation: ' + err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reserve a Football Field</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Field ID:</label>
        <input
          type="text"
          value={fieldId}
          onChange={(e) => setFieldId(e.target.value)}
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label>Start Time:</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>
      <div>
        <label>End Time:</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      <button type="submit">Reserve</button>
    </form>
  );
};

export default ReservaForm;