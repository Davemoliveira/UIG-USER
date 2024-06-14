import React, { useEffect, useState } from 'react';

const AWSStatusChecker = () => {
  const [status, setStatus] = useState('Checking...');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://downdetectorapi.com/api/v1/services/aws')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Assuming the API returns a status field that indicates the service status
        if (data.status === 'up') {
          setStatus('Up');
        } else {
          setStatus('Down');
        }
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>AWS Services Status</h1>
      <h2>Status: {status}</h2>
    </div>
  );
};

export default AWSStatusChecker;
