import React from 'react';

const ProgressBar = () => {
  return (
    <div className="w-1/4 mx-auto mt-4">
      <div className="h-4 bg-gray-300 rounded-full">
        <div className="h-full bg-blue-500 rounded-full" style={{ width: '33%' }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
