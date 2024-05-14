// src/components/Calendar.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div>
      <h2>Select Date</h2>
      <Calendar
        onChange={onChange}
        value={date}
      />
    </div>
  );
};

export default MyCalendar;
