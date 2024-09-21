import React from 'react';
import '../styles/Loader.css'; // Import the CSS file for styling

const Loader: React.FC = () => {
  return (
    <div className=" flex items-center mx-auto loader-container">
      <div className="loader">
        <div className="loader-ball"></div>
        <div className="loader-ball"></div>
        <div className="loader-ball"></div>
      </div>      
    </div>
  );
};

export default Loader;
