import React, { useState, useEffect } from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message, onClose }) => {
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
      <div className="error-message-container">
        <div className="error-message">
          <div className="error-message-text">Error : {message}</div>
        </div>
      </div>
    )
  );
};

export default ErrorMessage;
