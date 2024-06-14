import React, { useState, useEffect } from 'react';

const CheckReactV = () => {
  const [reactVersion, setReactVersion] = useState('');

  useEffect(() => {
    // Fetch the package.json file
    fetch('/package.json')
      .then(response => response.json())
      .then(data => setReactVersion(data.dependencies.react || data.devDependencies.react))
      .catch(error => console.error('Error fetching React version:', error));
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>React Version</h1>
      <p><strong>Version:</strong> {reactVersion}</p>
    </div>
  );
};

// Inline styles for the component
const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: '24px',
    marginBottom: '10px',
  },
};

export default CheckReactV;
