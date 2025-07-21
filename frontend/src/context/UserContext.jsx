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
  const [totalPoints, setTotalPoints] = useState(0);

  // Function to refresh the user list
  const refreshUsers = () => {
    setRefreshFlag(prev => prev + 1);
  };
  
  // Function to update total points
  const updateTotalPoints = (points) => {
    setTotalPoints(points);
  };

  // Fetch all users - this useEffect will run whenever refreshFlag changes
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await getAllUser();
        console.log("Context Users data:", res.data);
        const fetchedUsers = res.data.users || [];
        setUsers(fetchedUsers);
        
        // Set initial total points if we have users but no points yet
        if (fetchedUsers.length > 0 && totalPoints === 0) {
          // Use the first user's points as default if available
          const firstUserPoints = fetchedUsers[0]?.totalPoints || 0;
          setTotalPoints(firstUserPoints);
        }
        
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
  }, [refreshFlag, totalPoints]);

  // The value that will be provided to consumers of this context
  const value = {
    users,
    loading,
    error,
    refreshUsers,
    totalPoints,
    updateTotalPoints
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};