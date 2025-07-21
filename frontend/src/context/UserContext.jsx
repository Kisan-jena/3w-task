/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAllUser } from '../services/userService';

// Create the context
export const UserContext = createContext();

// Create a custom hook to use the context
export const useUsers = () => useContext(UserContext);

// Create the provider component
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(0);

  // Function to refresh the user list
  const refreshUsers = () => {
    setRefreshFlag(prev => prev + 1);
  };

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await getAllUser();
        console.log("Context Users data:", res.data);
        setUsers(res.data.users || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching users in context:", error);
        setError("Failed to load users");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [refreshFlag]);

  // The value that will be provided to consumers of this context
  const value = {
    users,
    loading,
    error,
    refreshUsers
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};