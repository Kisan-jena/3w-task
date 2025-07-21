import API from './api.js';

export const getAllUser=()=>API.get('/user/alluser');
export const addUser = (name) => API.post('/user/add', { name });
export const editUser = (userId, new_name) => API.put(`/user/edit/${userId}`, { new_name });
export const deleteUser = (userId) => API.delete(`/user/delete/${userId}`);