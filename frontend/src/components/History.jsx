import React, { useState, useEffect } from 'react';

const History = () => {
  const [history, setHistory] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        
        // First get all users if not already loaded
        let usersList = users;
        if (users.length === 0) {
          const usersResponse = await fetch('http://localhost:3000/api/user/alluser');
          if (!usersResponse.ok) {
            throw new Error('Failed to fetch users');
          }
          
          const usersData = await usersResponse.json();
          usersList = usersData.users || [];
          setUsers(usersList);
        }
        
        // Then get history for each user or selected user
        const allHistory = [];
        const usersToFetch = selectedUser === 'all' ? usersList : usersList.filter(u => u._id === selectedUser);
        
        for (const user of usersToFetch) {
          try {
            const historyResponse = await fetch(`http://localhost:3000/api/claim/history/${user._id}`);
            if (historyResponse.ok) {
              const historyData = await historyResponse.json();
              const userHistory = historyData.claimHistory || [];
              
              // Add user name to each history entry
              userHistory.forEach(entry => {
                allHistory.push({
                  ...entry,
                  userName: user.name,
                  claimedAt: entry.timeStamp,
                  pointsEarned: entry.points
                });
              });
            }
          } catch (error) {
            console.error(`Error fetching history for user ${user.name}:`, error);
          }
        }
        
        // Sort all history by timestamp (newest first)
        allHistory.sort((a, b) => new Date(b.claimedAt) - new Date(a.claimedAt));
        
        setHistory(allHistory);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [selectedUser, users]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const filteredHistory = history.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'today') {
      const today = new Date().toDateString();
      return new Date(item.claimedAt).toDateString() === today;
    }
    if (filter === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(item.claimedAt) >= weekAgo;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading history...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-gray-800">
            📊 Points History
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none min-w-[180px]"
            >
              <option value="all">All Users</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
            
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none min-w-[140px]"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
            </select>
          </div>
        </div>

        {filteredHistory.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">
              {selectedUser === 'all' 
                ? 'No history found' 
                : `No history found for ${users.find(u => u._id === selectedUser)?.name || 'this user'}`}
            </p>
          </div>
        ) : (
          <>
            {/* Selected User Info */}
            {selectedUser !== 'all' && (
              <div className="mb-6 p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {users.find(u => u._id === selectedUser)?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {users.find(u => u._id === selectedUser)?.name || 'Unknown User'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Total Points: <span className="font-bold text-purple-600">
                          {users.find(u => u._id === selectedUser)?.totalPoints || 0}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-purple-600">
                      {filteredHistory.length}
                    </p>
                    <p className="text-sm text-gray-600">Claims</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              {filteredHistory.map((item, index) => (
                <div
                  key={item._id || index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {item.userName ? item.userName.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {item.userName || 'Unknown User'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatDate(item.claimedAt)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xl font-bold text-green-600">
                      +{item.pointsEarned}
                    </div>
                    <div className="text-sm text-gray-500">
                      points
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Summary Stats */}
        {filteredHistory.length > 0 && (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{filteredHistory.length}</p>
              <p className="text-gray-600">Total Claims</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {filteredHistory.reduce((sum, item) => sum + item.pointsEarned, 0)}
              </p>
              <p className="text-gray-600">Total Points</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {Math.round(filteredHistory.reduce((sum, item) => sum + item.pointsEarned, 0) / filteredHistory.length)}
              </p>
              <p className="text-gray-600">Avg Points</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {Math.max(...filteredHistory.map(item => item.pointsEarned))}
              </p>
              <p className="text-gray-600">Highest Spin</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
