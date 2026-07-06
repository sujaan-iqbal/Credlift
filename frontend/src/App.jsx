import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchCreditProfile, fetchLoanOffers, updateCreditScore } from './services/api';

import CreditScoreGauge from './components/Dashboard/CreditScoreGauge';
import ScoreFactorCard from './components/Dashboard/ScoreFactorCard';
import PotentialScore from './components/Dashboard/PotentialScore';
import OfferList from './components/Offers/OfferList';
import FilterBar from './components/Offers/FilterBar';
import ScoreSimulator from './components/Bonus/ScoreSimulator';
import EmiCalculator from './components/Bonus/EmiCalculator';
import Loader from './components/Common/Loader';
import ErrorMessage from './components/Common/ErrorMessage';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Data State
  const [profiles, setProfiles] = useState([]);
  const [currentProfileId, setCurrentProfileId] = useState(1);
  const [profile, setProfile] = useState(null);
  const [offers, setOffers] = useState([]);

  // New Profile Form State
  const [newName, setNewName] = useState('');
  const [newMobile, setNewMobile] = useState('');
  const [newPan, setNewPan] = useState('');

  // Simulated Bureau Score Input
  const [simulatedScore, setSimulatedScore] = useState(620);

  // Filter State
  const [filters, setFilters] = useState({ searchTerm: '', statusFilter: 'all' });

  // Load Data on Mount
  useEffect(() => {
    if (currentProfileId) loadProfileData(currentProfileId);
  }, [currentProfileId]);

  const loadProfileData = async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      const profileRes = await fetchCreditProfile(id);
      setProfile(profileRes.data);

      const offersRes = await fetchLoanOffers(id);
      setOffers(offersRes.data);
      
    } catch (err) {
      setError(`Failed to load profile ${id}. Ensure it exists in the backend.`);
      setProfile(null);
      setOffers([]);
    } finally {
      setLoading(false);
    }
  };

  // Create New Customer
  const handleCreateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/customers', {
        name: newName,
        mobile: newMobile,
        pan: newPan
      });
      
      const newId = response.data.id;
      setProfiles([...profiles, response.data]);
      setCurrentProfileId(newId);
      
      setNewName('');
      setNewMobile('');
      setNewPan('');
      
      alert(`✅ Customer created with ID: ${newId}`);
    } catch (err) {
      alert('❌ Error creating customer: ' + (err.response?.data?.error || err.message));
    }
  };

  // Simulate Bureau Fetch (Manual Trigger)
  const handleSimulateScore = async () => {
    if (!currentProfileId) return alert("Please select a profile first.");
    try {
      await updateCreditScore(currentProfileId, simulatedScore);
      alert(`✅ Simulated CIBIL score ${simulatedScore} fetched for ID ${currentProfileId}!`);
      loadProfileData(currentProfileId);
    } catch (err) {
      alert('❌ Error updating score: ' + (err.response?.data?.error || err.message));
    }
  };

  // Accept Offer
  const handleAcceptOffer = (offerId) => {
    if (window.confirm("Are you sure you want to accept this offer?")) {
      alert(`Offer ${offerId} accepted! (Simulated)`);
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={() => loadProfileData(currentProfileId)} />;

  return (
    <div className="App" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>🏦 Softlend Dashboard</h1>
        <p>Loan Marketplace & Credit Improvement Engine</p>
      </header>

      {/* ================= CREATE PROFILE SECTION ================= */}
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f0f4ff', 
        borderRadius: '8px', 
        marginBottom: '20px',
        border: '1px solid #bbdefb'
      }}>
        <h3 style={{ marginTop: 0 }}>👤 Create New Profile</h3>
        <form onSubmit={handleCreateProfile} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <input placeholder="Full Name" value={newName} onChange={(e) => setNewName(e.target.value)} required style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input placeholder="Mobile (10 digits)" value={newMobile} onChange={(e) => setNewMobile(e.target.value)} required style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input placeholder="PAN (ABCDE1234F)" value={newPan} onChange={(e) => setNewPan(e.target.value)} required style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Create Profile</button>
        </form>
      </div>

      {/* ================= BUREAU SIMULATOR ================= */}
      <div style={{
        padding: '20px',
        backgroundColor: '#fff3e0',
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #ffb74d'
      }}>
        <h3 style={{ marginTop: 0, color: '#e65100' }}>📋 CIBIL / Experian Score Simulator</h3>
        <p style={{ fontSize: '14px', color: '#555' }}>
          In production, Softlend fetches this data from credit bureaus. For this demo, enter a score and click "Fetch Report" to simulate the bureau fetch.
        </p>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
          <label>
            Enter Credit Score:
            <input 
              type="number" 
              value={simulatedScore} 
              onChange={(e) => setSimulatedScore(Number(e.target.value))}
              min="300"
              max="900"
              style={{ marginLeft: '10px', padding: '8px', width: '80px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </label>
          <button 
            onClick={handleSimulateScore}
            style={{ padding: '10px 20px', backgroundColor: '#e65100', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            🔄 Fetch Report & Analyze Gaps
          </button>
        </div>
      </div>

      {/* ================= VIEW PROFILE SELECTOR ================= */}
      <div style={{ marginBottom: '20px' }}>
        <label>Select Profile: </label>
        <select 
          value={currentProfileId} 
          onChange={(e) => setCurrentProfileId(Number(e.target.value))}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginLeft: '10px' }}
        >
          <option value="1">ID 1 (Default)</option>
          {profiles.map(p => (
            <option key={p.id} value={p.id}>ID {p.id} - {p.name}</option>
          ))}
        </select>
        <button 
          onClick={() => loadProfileData(currentProfileId)}
          style={{ marginLeft: '10px', padding: '8px 15px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Refresh
        </button>
      </div>

      {/* ================= DASHBOARD ================= */}
      {profile ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '30px' }}>
          
          {/* Left Side: Score + Factors */}
          <div>
            <CreditScoreGauge score={profile.cibil_score} lastUpdated={profile.score_fetched_at} />
            
            <h3 style={{ marginTop: '20px' }}>Why your score is low:</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {profile.gaps.map((gap) => (
                <ScoreFactorCard key={gap.id} gap={gap} />
              ))}
            </div>

            <PotentialScore currentScore={profile.cibil_score} gaps={profile.gaps} />
            <ScoreSimulator gaps={profile.gaps} currentScore={profile.cibil_score} offers={offers} />
            <EmiCalculator />
          </div>

          {/* Right Side: Loan Offers */}
          <div>
            <h2 style={{ marginTop: 0 }}>Your Loan Offers</h2>
            <FilterBar onFilterChange={setFilters} />
            <OfferList offers={offers} filters={filters} onAccept={handleAcceptOffer} />
          </div>

        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <h3>No profile selected or profile not found.</h3>
          <p>Create a new profile or select an existing ID from the dropdown.</p>
        </div>
      )}
    </div>
  );
}

export default App;