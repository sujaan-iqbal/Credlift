import React from 'react';

const PotentialScore = ({ currentScore, gaps }) => {
  // Sum all open gap gains
  const potentialGain = gaps
    .filter(g => g.status === 'open')
    .reduce((acc, curr) => acc + curr.estimated_score_gain, 0);

  const potentialScore = currentScore + potentialGain;

  return (
    <div style={{
      marginTop: '20px',
      padding: '15px',
      backgroundColor: '#e8f5e9',
      borderRadius: '8px',
      border: '1px solid #a5d6a7'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#2e7d32' }}>
        📈 Potential Score: {potentialScore}
      </div>
      <div style={{ fontSize: '14px', color: '#555' }}>
        If you fix all {gaps.filter(g => g.status === 'open').length} open gaps, you could gain <strong>+{potentialGain} points</strong>.
      </div>
    </div>
  );
};

export default PotentialScore;