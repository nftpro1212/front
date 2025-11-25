import axios from 'axios';
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://backend-n5wj.onrender.com',
  timeout: 10000
});

// auth
export const telegramLogin = (tgId, username, startParam) => API.post('/api/auth/login', { telegramId: tgId, username, startParam });

// subscription
export const createSubscription = (telegramId) => API.post(`/subscription/${telegramId}`, { provider: 'demo', amount: 2.0 });
export const getSubscription = (telegramId) => API.get(`/subscription/${telegramId}`);

// referrals
export const getLeaderboard = (month) => API.get(`/referrals/leaderboard${month ? '?month='+month : ''}`);
export const createReferral = (inviterTelegramId, invitedTelegramId) => API.post('/referrals/create', { inviterTelegramId, invitedTelegramId });

// winners/draws
export const getDraws = () => API.get('/winners');
export const triggerMonthlyDraw = (adminKey, month) => API.post('/winners/draw-monthly', { month }, { headers: { 'x-admin-key': adminKey }});

export default API;
