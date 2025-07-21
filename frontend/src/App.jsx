import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Spinner from './components/spinner';
import Leaderboard from './components/leaderboard';
import History from './components/History';
import UserManagement from './components/UserManagement';

const App = () => {
  const [activeTab, setActiveTab] = useState('game');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/user/alluser');
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || data); // Handle both { users: [...] } and [...] formats
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async (userId, points) => {
    try {
      const response = await fetch(`http://localhost:3000/api/claim/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          points: points,
        }),
      });

      if (response.ok) {
        // Refresh users to get updated points
        await fetchUsers();
        return true;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to claim points');
      }
    } catch (error) {
      console.error('Error claiming points:', error);
      throw error;
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'game':
        return (
          <Spinner
            users={users}
            onClaim={handleClaim}
            isSpinning={isSpinning}
            setIsSpinning={setIsSpinning}
          />
        );
      case 'leaderboard':
        return <Leaderboard users={users} loading={loading} />;
      case 'history':
        return <History />;
      case 'users':
        return <UserManagement users={users} onRefreshUsers={fetchUsers} />;
      default:
        return (
          <Spinner
            users={users}
            onClaim={handleClaim}
            isSpinning={isSpinning}
            setIsSpinning={setIsSpinning}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto py-8">
        {renderActiveTab()}
      </main>
      
      {/* Loading Overlay */}
      {loading && activeTab !== 'history' && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
