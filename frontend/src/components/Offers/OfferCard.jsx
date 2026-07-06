import React from 'react';

const OfferCard = ({ offer, onAccept }) => {
  const isLocked = offer.locked;

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      borderRadius: '8px',
      border: isLocked ? '1px solid #e0e0e0' : '1px solid #4caf50',
      backgroundColor: isLocked ? '#f5f5f5' : '#ffffff',
      opacity: isLocked ? 0.7 : 1,
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
      <div>
        <h3 style={{ margin: 0 }}>{offer.lender}</h3>
        <div style={{ fontSize: '14px', color: '#666' }}>
          ₹{offer.amount.toLocaleString()} • {offer.interest_rate}% p.a. • {offer.tenure_months} months
        </div>
        <div style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '5px' }}>
          EMI: ₹{offer.emi?.toLocaleString() || 'Calculating...'}
        </div>
      </div>

      {isLocked ? (
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '24px' }}>🔒</div>
          <div style={{ fontSize: '13px', color: '#888' }}>
            Fix your credit to unlock
          </div>
          <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#ff9800' }}>
            Improve score by {offer.score_gap} pts
          </div>
        </div>
      ) : (
        <button 
          onClick={() => onAccept(offer.id)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Accept Offer
        </button>
      )}
    </div>
  );
};

export default OfferCard;