/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { addUser, editUser, deleteUser } from '../services/userService'
import { useUsers } from '../context/UserContext'
 
const UserManagement = () => {
  const { users, loading, error, refreshUsers } = useUsers();
  const [newName, setNewName] = useState('')
  const [editMode, setEditMode] = useState(null);
  const [editName, setEditName] = useState('')

  const handleAddUser = async () => {
    try {
      if (!newName.trim()) return;
      await addUser(newName);
      setNewName('');
      refreshUsers(); // Use context method to refresh
      console.log("User added successfully");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  }

  const handleEditUser = async (id) => {
    try {
      if (!editName.trim()) return;
      await editUser(id, editName);
      setEditMode(null);
      setEditName('');
      refreshUsers(); // Use context method to refresh
      console.log("User edited successfully");
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      refreshUsers(); // Use context method to refresh
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">User Management</h2>

      {/* Add User */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter user name"
          className="border rounded px-3 py-1 w-full"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button
          onClick={handleAddUser}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* User List */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
          {error}
        </div>
      ) : (
        <ul className="space-y-4">
          {users && users.length > 0 ? (
            users.map((user) => (
          <li
            key={user._id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow duration-200"
          >
            {editMode === user._id ? (
              <>
                <input
                  type="text"
                  className="border px-2 py-1 rounded w-full mr-2"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <button
                  onClick={() => handleEditUser(user._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(null)}
                  className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">{user.name}</span>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-gray-600 mr-1">Points:</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium text-sm">
                      {user.totalPoints || 0}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditMode(user._id);
                      setEditName(user.name);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
            ))
          ) : (
            <li className="bg-gray-50 p-6 rounded-lg text-center text-gray-500">
              No users found. Add a new user to get started.
            </li>
          )}
        </ul>
      )}
    </div>
  )
}
 
export default UserManagement