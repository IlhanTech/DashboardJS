import React, { useState, useEffect } from 'react';
import './SuccessMessage.css';

const SuccessMessage = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) {
        onClose();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    visible && (
      <div className="success-message-container">
        <div className="success-message">
          <div className="success-message-text">Success: {message}</div>
        </div>
      </div>
    )
  );
};

export default SuccessMessage;
