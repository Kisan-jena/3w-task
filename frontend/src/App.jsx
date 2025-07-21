import React from 'react'
import {Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/NavBar';
import Home from './pages/Home';
import History from './pages/History';
import LeaderBoard from './pages/LeaderBoard';
import UserManagement from './pages/UserManagement';

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/history" element={<History />} />
          <Route path="/users" element={<UserManagement />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
