import React from 'react';

const Leaderboard = ({ users, loading }) => {
  // Sort users by points in descending order
  const sortedUsers = [...users].sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0));

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return '🏅';
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-yellow-600';
      case 2:
        return 'from-gray-300 to-gray-500';
      case 3:
        return 'from-orange-400 to-orange-600';
      default:
        return 'from-blue-400 to-blue-600';
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading leaderboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🏆 Leaderboard
        </h2>
        
        {sortedUsers.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No users found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedUsers.map((user, index) => {
              const rank = index + 1;
              return (
                <div
                  key={user._id}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                    rank <= 3
                      ? 'bg-gradient-to-r ' + getRankColor(rank) + ' text-white border-transparent'
                      : 'bg-gray-50 border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">
                      {getRankIcon(rank)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold">#{rank}</span>
                        <span className={`text-xl font-semibold ${rank > 3 ? 'text-gray-800' : ''}`}>
                          {user.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${rank > 3 ? 'text-purple-600' : ''}`}>
                      {user.totalPoints || 0}
                    </div>
                    <div className={`text-sm ${rank > 3 ? 'text-gray-500' : 'text-white/80'}`}>
                      points
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {/* Stats Summary */}
        {sortedUsers.length > 0 && (
          <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{sortedUsers.length}</p>
              <p className="text-gray-600">Total Users</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {sortedUsers.reduce((sum, user) => sum + (user.totalPoints || 0), 0)}
              </p>
              <p className="text-gray-600">Total Points</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {sortedUsers.length > 0 ? Math.round(sortedUsers.reduce((sum, user) => sum + (user.totalPoints || 0), 0) / sortedUsers.length) : 0}
              </p>
              <p className="text-gray-600">Avg Points</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;