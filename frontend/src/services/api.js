import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

export const fetchCreditProfile = (customerId) => API.get(`/customers/${customerId}/credit-profile`);
export const fetchLoanOffers = (customerId) => API.get(`/customers/${customerId}/offers`);
export const acceptOfferApi = (offerId) => API.patch(`/offers/${offerId}/status`, { status: "active" });

// NEW: Update the customer's credit score (Simulate Bureau Fetch)
export const updateCreditScore = (customerId, score) => 
  API.post(`/customers/${customerId}/credit-score`, { cibil_score: score });