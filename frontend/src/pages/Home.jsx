import React, { useState } from 'react';
import Spinner from '../components/shared/Spinner';
import DropDown from '../components/shared/DropDown';
import Button from '../components/shared/Buttons';
import { useUsers } from '../context/UserContext';
import { claimPoints } from '../services/claimService';

const Home = () => {
  const { users, refreshUsers, totalPoints, updateTotalPoints } = useUsers();

  const [selectedUserId, setSelectedUserId] = useState('');
  const [spunPoints, setSpunPoints] = useState(null);
  const [claimed, setClaimed] = useState(false);
  const [error, setError] = useState('');
  
  // Helper function to find selected user's points
  const updateSelectedUserPoints = (userId) => {
    if (!userId) return;
    const selectedUser = users.find(user => user._id === userId);
    if (selectedUser) {
      updateTotalPoints(selectedUser.totalPoints || 0);
    }
  };

  const handleClaim = async () => {
    setError('');
    setClaimed(false);

    if (!selectedUserId || spunPoints === null) {
      setError("Please select a user and spin first!");
      return;
    }

    try {
      const res = await claimPoints(selectedUserId, spunPoints);
      console.log("Claim response:", res.data);
      
      // Based on the backend controller, the response structure is:
      // { message, user: updatedUser, history }
      if (res.data && res.data.user) {
        // Update total points from the user object in the response
        updateTotalPoints(res.data.user.totalPoints);
      } else if (res.data) {
        // Fallback in case the response structure changes
        const pointsToAdd = spunPoints || 0;
        const currentUserPoints = totalPoints || 0;
        updateTotalPoints(currentUserPoints + pointsToAdd);
      }
      
      setClaimed(true);
      refreshUsers(); // refresh the context data
    } catch (err) {
      console.error("Error claiming points:", err);
      setError("Claim failed! Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Claim Points 🎲</h2>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Select User */}
      <div className="mb-4">
        <DropDown
          label="Select User"
          options={users || []}
          selected={selectedUserId}
          onChange={(val) => {
            setSelectedUserId(val);
            setClaimed(false);
            setError('');
            updateSelectedUserPoints(val);
          }}
        />
      </div>

      {/* Spinner */}
      <div className="mb-6">
        <Spinner
          onSpin={(num) => {
            setSpunPoints(num);
            setClaimed(false);
            setError('');
          }}
        />
      </div>

      {/* Claim Button */}
      <div className="mb-6 text-center">
        <Button
          text="Claim Points"
          onClick={handleClaim}
          variant="primary"
          className="w-full"
        />
      </div>

      {/* Result */}
      {claimed && (
        <div className="bg-green-100 border border-green-400 text-green-800 p-4 rounded text-center shadow-md">
          🎉 <strong>You won {spunPoints} points!</strong> <br />
          🧮 <strong>Total Points Now: {totalPoints}</strong>
        </div>
      )}
      
      {/* Overall Total Points Display */}
      <div className="mt-8 text-center">
        <div className="inline-block px-6 py-3 bg-blue-100 text-blue-800 rounded-full font-bold text-xl">
          🏆 Total Points: {totalPoints || 0}
        </div>
      </div>
    </div>
  );
};

export default Home;
