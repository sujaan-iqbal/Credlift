import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '50px', 
      backgroundColor: '#ffebee', 
      borderRadius: '8px', 
      margin: '20px' 
    }}>
      <h2 style={{ color: '#c62828' }}>⚠️ Oops!</h2>
      <p style={{ color: '#d32f2f' }}>{message}</p>
      <button 
        onClick={onRetry}
        style={{
          padding: '10px 20px',
          backgroundColor: '#c62828',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '15px'
        }}
      >
        Retry Connection
      </button>
    </div>
  );
};

export default ErrorMessage;