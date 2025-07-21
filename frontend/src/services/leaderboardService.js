// src/services/leaderboardService.js
import API from './api';

export const getLeaderboard = () => API.get('/leaderboard/rank');
