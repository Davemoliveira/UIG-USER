import React, { useState } from 'react';

const DarkModeToggle = () => {
  // State to track whether dark mode is enabled
  const [darkMode, setDarkMode] = useState(false);

  // Function to toggle dark mode state
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
};

export default DarkModeToggle;
