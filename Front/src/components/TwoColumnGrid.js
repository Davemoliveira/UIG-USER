import React from "react";

const TwoColumnGrid = () => {
  // Generating rows for the left column
  const leftColumnRows = Array.from({ length: 8 }, (_, index) => (
    <div key={`left-row-${index}`} className="row">
      Left Column Row {index + 1}
    </div>
  ));

  // Generating rows for the right column
  const rightColumnRows = Array.from({ length: 8 }, (_, index) => (
    <div key={`right-row-${index}`} className="row">
      Right Column Row {index + 1}
    </div>
  ));

  return (
    <div className="container">
      <div className="column">
        <h2>Left Column</h2>
        {leftColumnRows}
        <p>dark mode</p>
      </div>
      <div className="column">
        <h2>Right Column</h2>
        {rightColumnRows}
      </div>
    </div>
  );
};

export default TwoColumnGrid;
