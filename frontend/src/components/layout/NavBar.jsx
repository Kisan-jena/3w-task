import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <h1 className="font-bold text-xl">🏆Spin & Win</h1>
      <div className="flex gap-4">
        <Link to="/" className="hover:text-yellow-300">Home</Link>
        <Link to="/leaderboard" className="hover:text-yellow-300">Leaderboard</Link>
        <Link to="/history" className="hover:text-yellow-300">History</Link>
        <Link to="/users" className="hover:text-yellow-300">Users</Link>
      </div>
    </nav>
  )
}

export default Navbar
