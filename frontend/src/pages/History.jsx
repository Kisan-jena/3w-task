import React, { useState } from 'react';
import { useUsers } from '../context/UserContext';
import { getClaimHistory } from '../services/claimService';
import DropDown from '../components/shared/DropDown';
import Button from '../components/shared/Buttons';

const History = () => {
  const { users } = useUsers();
  const [selectedUserId, setSelectedUserId] = useState('');
  const [history, setHistory] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchHistory = async () => {
    if (!selectedUserId) {
      setError('Please select a user first!');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const res = await getClaimHistory(selectedUserId);
      setHistory(res.data.claimHistory || []);
      setUserData(res.data.user || null);
      setError('');
    } catch (err) {
      console.error('Error fetching claim history:', err);
      setError('Failed to load claim history. Please try again.');
      setHistory([]);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  // Format timestamp to readable date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">📜 Claim History</h2>
      
      {/* User Selection */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="mb-4">
          <DropDown
            label="Select User"
            options={users || []}
            selected={selectedUserId}
            onChange={(val) => {
              setSelectedUserId(val);
              setHistory([]);
              setUserData(null);
              setError('');
            }}
          />
        </div>
        
        <Button 
          text="View History" 
          onClick={fetchHistory} 
          variant="primary"
          className="w-full"
          disabled={!selectedUserId || loading}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center my-6">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
        </div>
      )}

      {/* User Info */}
      {userData && (
        <div className="bg-blue-100 p-4 rounded-lg shadow mb-6 text-center">
          <h3 className="font-bold text-lg text-blue-800">{userData.name}</h3>
          <p className="text-blue-600">Total Points: <span className="font-bold">{userData.totalPoints}</span></p>
          <p className="text-sm text-blue-700">Total Claims: {history.length}</p>
          {history.length > 0 && (
            <p className="text-xs text-blue-700 mt-2">
              Last claim: {formatDate(history[0].timeStamp)}
            </p>
          )}
        </div>
      )}

      {/* History Table */}
      {history.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 text-left">Date & Time</th>
                <th className="py-2 px-4 text-left">Points Claimed</th>
              </tr>
            </thead>
            <tbody>
              {history.map((claim) => (
                <tr key={claim._id} className="border-t hover:bg-gray-100">
                  <td className="py-2 px-4">{formatDate(claim.timeStamp)}</td>
                  <td className="py-2 px-4 font-semibold text-green-600">+{claim.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
      ) : userData ? (
        <div className="text-center p-6 bg-gray-100 rounded shadow">
          <p className="text-gray-600">No claim history found for this user.</p>
        </div>
      ) : selectedUserId ? (
        <div className="text-center p-6 bg-gray-100 rounded shadow">
          <p className="text-gray-600">Click "View History" to see this user's claim history.</p>
        </div>
      ) : (
        <div className="text-center p-6 bg-gray-100 rounded shadow">
          <p className="text-gray-600">Select a user to view their claim history.</p>
        </div>
      )}
    </div>
  );
};

export default History;
 