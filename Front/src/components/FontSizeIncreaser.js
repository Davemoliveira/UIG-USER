// IN PROGRESS: Setting > Increase/Decrease font size
import React, { useState } from 'react';

const FontSizeIncreaser = () => {
  const [fontSize, setFontSize] = useState(16); // Initial font size

  const increaseFontSize = () => {
    setFontSize(prevFontSize => prevFontSize + 2); // Increase font size by 2 units
  };

  const decreaseFontSize = () => {
    setFontSize(prevFontSize => Math.max(prevFontSize - 2, 10)); // Decrease font size by 2 units, with minimum of 10
  };

  return (
    <div>
      <button onClick={increaseFontSize}>Increase Font Size</button>
      <button onClick={decreaseFontSize}>Decrease Font Size</button>
      <div style={{ fontSize: `${fontSize}px` }}>
        {/* Text content where the font size will be adjusted */}
      </div>
    </div>
  );
};

export default FontSizeIncreaser;
