import React, { useEffect, useState } from 'react';

const ServerPort = () => {
  const [port, setPort] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/server-port')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPort(data.port);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (port === null) {
    return <div>Loading...</div>;
  }

  return <div>Server Port: {port}</div>;
};

export default ServerPort;
