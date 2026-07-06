import React, { useState } from 'react';

const ScoreSimulator = ({ gaps, currentScore, offers }) => {
  const [selectedGains, setSelectedGains] = useState([]);

  const toggleGap = (id, gain) => {
    if (selectedGains.includes(id)) {
      setSelectedGains(selectedGains.filter(g => g !== id));
    } else {
      setSelectedGains([...selectedGains, id]);
    }
  };

  const projectedScore = currentScore + selectedGains.reduce((a, b) => a + b, 0);

  // Check which offers unlock dynamically
  const newlyUnlocked = offers.filter(o => 
    !o.locked && projectedScore >= o.min_score_required
  );

  return (
    <div style={{
      marginTop: '20px',
      padding: '20px',
      backgroundColor: '#f3e5f5',
      borderRadius: '8px',
      border: '1px solid #ce93d8'
    }}>
      <h4 style={{ marginTop: 0, color: '#6a1b9a' }}>🎯 What-If Simulator</h4>
      <div style={{ fontSize: '14px', marginBottom: '10px' }}>
        Tick the actions you plan to take:
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' }}>
        {gaps.filter(g => g.status === 'open').map(gap => (
          <label key={gap.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              onChange={() => toggleGap(gap.id, gap.estimated_score_gain)}
            />
            <span>
              {gap.factor.replace(/_/g, ' ')} 
              <span style={{ color: '#2e7d32', fontWeight: 'bold' }}> (+{gap.estimated_score_gain} pts)</span>
            </span>
          </label>
        ))}
      </div>

      <div style={{ 
        padding: '10px', 
        backgroundColor: 'white', 
        borderRadius: '4px', 
        border: '1px solid #e0e0e0' 
      }}>
        <div style={{ fontWeight: 'bold' }}>
          Projected Score: <span style={{ color: '#6a1b9a' }}>{projectedScore}</span>
        </div>
        {newlyUnlocked.length > 0 && (
          <div style={{ color: '#2e7d32', fontSize: '14px', marginTop: '5px' }}>
            🎉 You unlocked: {newlyUnlocked.map(o => o.lender).join(', ')}!
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreSimulator;