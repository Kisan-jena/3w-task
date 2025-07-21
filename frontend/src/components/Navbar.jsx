import React from 'react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'game', label: 'Spin & Win' },
    { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'history', label: 'History' },
    { id: 'users', label: 'Manage Users'}
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl"></span>
            <h1 className="text-2xl font-bold text-white">Spin & Win</h1>
          </div>
          
          <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-purple-600 shadow-md'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;