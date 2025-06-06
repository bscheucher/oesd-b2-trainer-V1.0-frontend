// components/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Ihr Text wird bewertet...</p>
      <small>Dies kann einige Sekunden dauern</small>
    </div>
  );
};

export default LoadingSpinner;