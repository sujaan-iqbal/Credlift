import React from 'react';
import OfferCard from './OfferCard';

const OfferList = ({ offers, filters, onAccept }) => {
  // 1. Filter Logic
  const filteredOffers = offers.filter((offer) => {
    const matchesSearch = offer.lender.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    let matchesStatus = true;
    if (filters.statusFilter === 'unlocked') matchesStatus = !offer.locked;
    if (filters.statusFilter === 'locked') matchesStatus = offer.locked;

    return matchesSearch && matchesStatus;
  });

  // 2. EMPTY STATE (as per PDF)
  if (filteredOffers.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h3>No offers available yet.</h3>
        <p>Improve your credit score to unlock offers.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      {filteredOffers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} onAccept={onAccept} />
      ))}
    </div>
  );
};

export default OfferList;