import React, { useState } from 'react';

const EmiCalculator = () => {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(10.5);
  const [tenure, setTenure] = useState(36);

  // Formula: EMI = [P x r x (1+r)^n] / [(1+r)^n - 1]
  // r = annual_rate / 12 / 100
  const calculateEmi = () => {
    const monthlyRate = rate / 12 / 100;
    if (monthlyRate === 0) return principal / tenure;
    
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(emi * 100) / 100;
  };

  return (
    <div style={{
      marginTop: '30px',
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0'
    }}>
      <h3 style={{ marginTop: 0, color: '#1976d2' }}>🧮 EMI Calculator</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Principal (₹)</label>
          <input 
            type="number" 
            value={principal} 
            onChange={(e) => setPrincipal(Number(e.target.value))}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Interest Rate (% p.a.)</label>
          <input 
            type="number" 
            value={rate} 
            onChange={(e) => setRate(Number(e.target.value))}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Tenure (Months)</label>
          <input 
            type="number" 
            value={tenure} 
            onChange={(e) => setTenure(Number(e.target.value))}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
        <div style={{ fontSize: '14px', color: '#555' }}>Your Monthly EMI:</div>
        <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0d47a1' }}>
          ₹{calculateEmi().toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default EmiCalculator;