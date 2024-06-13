// Date & Time component > Added to Footer Component
import React from 'react';
import moment from 'moment';

function DateTime() {
    const date = moment().format("DD MMM YYYY");
    const time = moment().format("HH:mm");
  
    return (
      <div className='text-center text-white'>
        <p> { date } <br/> { time } </p>
      </div>
    )
  }

export default DateTime;
