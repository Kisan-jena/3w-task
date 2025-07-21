// API base URL
const API_BASE_URL = 'http://localhost:3000/api';

// API service functions
export const apiService = {
  // Users
  getUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  createUser: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error('Failed to create user');
    return response.json();
  },

  updateUser: async (userId, userData) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error('Failed to update user');
    return response.json();
  },

  deleteUser: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete user');
    return response.json();
  },

  // Claims
  claimPoints: async (userId, pointsEarned) => {
    const response = await fetch(`${API_BASE_URL}/claims`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, pointsEarned })
    });
    if (!response.ok) throw new Error('Failed to claim points');
    return response.json();
  },

  // History
  getClaimsHistory: async () => {
    const response = await fetch(`${API_BASE_URL}/claims/history`);
    if (!response.ok) throw new Error('Failed to fetch claims history');
    return response.json();
  },

  // Leaderboard
  getLeaderboard: async () => {
    const response = await fetch(`${API_BASE_URL}/leaderboard`);
    if (!response.ok) throw new Error('Failed to fetch leaderboard');
    return response.json();
  }
};

export default apiService;
