import React from 'react';
import './MaintenancePage.css';

function MaintenancePage() {
  return (
    <div className="maintenance-container">
      <div className="maintenance-content">
        <h1 className="maintenance-title">Site Under Maintenance</h1>
        <p className="maintenance-description">
          We apologize for the inconvenience. Our site is currently undergoing essential
          maintenance to provide you with a better experience.
        </p>
        <p className="maintenance-message">
          Please check back later. Thank you for your patience!
        </p>
      </div>
    </div>
  );
}

export default MaintenancePage;
