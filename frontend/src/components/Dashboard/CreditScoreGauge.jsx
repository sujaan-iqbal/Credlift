import React from 'react';

const CreditScoreGauge = ({ score, lastUpdated }) => {
  // Determine color based on PDF scoring rules
  let color = '#d32f2f'; // Red (< 650)
  if (score >= 650 && score < 750) color = '#ff9800'; // Amber
  if (score >= 750) color = '#4caf50'; // Green

  // Calculate percentage for the circular progress (Max 900)
  const percentage = Math.min((score / 900) * 100, 100);

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '20px', 
      backgroundColor: '#f5f5f5', 
      borderRadius: '8px' 
    }}>
      <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto' }}>
        {/* SVG Circular Progress */}
        <svg width="150" height="150" viewBox="0 0 150 150">
          {/* Background Circle */}
          <circle
            cx="75"
            cy="75"
            r="60"
            stroke="#e0e0e0"
            strokeWidth="10"
            fill="none"
          />
          {/* Progress Circle */}
          <circle
            cx="75"
            cy="75"
            r="60"
            stroke={color}
            strokeWidth="10"
            fill="none"
            strokeDasharray="377"
            strokeDashoffset={377 - (377 * percentage) / 100}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
          />
          {/* Score Text */}
          <text
            x="75"
            y="75"
            dominantBaseline="central"
            textAnchor="middle"
            fontSize="28"
            fontWeight="bold"
            fill={color}
          >
            {score}
          </text>
        </svg>
      </div>
      <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
        Last Updated: {lastUpdated ? new Date(lastUpdated).toLocaleDateString() : 'N/A'}
      </div>
    </div>
  );
};

export default CreditScoreGauge;