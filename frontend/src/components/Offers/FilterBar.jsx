import React, { useState, useEffect } from 'react';

const FilterBar = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Debounce logic: wait 300ms after user stops typing before calling parent
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ searchTerm, statusFilter });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, statusFilter, onFilterChange]);

  return (
    <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <input
        type="text"
        placeholder="Search lender (e.g. HDFC)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      
      <select 
        value={statusFilter} 
        onChange={(e) => setStatusFilter(e.target.value)}
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
      >
        <option value="all">All Offers</option>
        <option value="unlocked">Unlocked Only</option>
        <option value="locked">Locked Only</option>
      </select>
    </div>
  );
};

export default FilterBar;