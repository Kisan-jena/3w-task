import API from './api';

export const claimPoints = async (userId, points) => API.post(`/claim/${userId}`, { points })  
