import React from 'react';

// Sample component to display the port number
const PortDisplay = ({ port }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}></h1>
      <p style={styles.port}>{port}</p>
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

export default PortDisplay;