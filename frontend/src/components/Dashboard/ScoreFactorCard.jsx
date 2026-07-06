import React from 'react';

const ScoreFactorCard = ({ gap }) => {
  // Impact Badge Color logic
  let badgeColor = '#4caf50'; // Low -> Green
  if (gap.impact === 'high') badgeColor = '#d32f2f'; // High -> Red
  if (gap.impact === 'medium') badgeColor = '#ff9800'; // Medium -> Amber

  return (
    <div style={{
      padding: '15px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      border: '1px solid #e0e0e0'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>
            {gap.factor.replace(/_/g, ' ').toUpperCase()}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            Current: <strong>{gap.current_value}</strong> | Ideal: <strong>{gap.ideal_value}</strong>
          </div>
          <div style={{ fontSize: '14px', marginTop: '8px' }}>
            {gap.action_description}
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minWidth: '80px' }}>
          <span style={{
            backgroundColor: badgeColor,
            color: 'white',
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 'bold',
            marginBottom: '5px'
          }}>
            {gap.impact}
          </span>
          <span style={{ color: '#2e7d32', fontWeight: 'bold', fontSize: '14px' }}>
            +{gap.estimated_score_gain} pts
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScoreFactorCard;