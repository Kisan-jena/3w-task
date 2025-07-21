import React, { useState } from 'react';

const UserManagement = ({ users, onRefreshUsers }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Name is required');
      return;
    }

    setLoading(true);
    try {
      const url = editingUser 
        ? `http://localhost:3000/api/user/edit/${editingUser._id}`
        : 'http://localhost:3000/api/user/add';
      
      const method = editingUser ? 'PUT' : 'POST';
      
      const requestBody = editingUser 
        ? { new_name: formData.name }
        : { name: formData.name };
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        setFormData({ name: '', email: '' });
        setShowAddForm(false);
        setEditingUser(null);
        onRefreshUsers();
        alert(editingUser ? 'User updated successfully!' : 'User added successfully!');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error saving user');
      }
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Error saving user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name });
    setShowAddForm(true);
  };

  const handleDelete = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/user/delete/${userId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        onRefreshUsers();
        alert('User deleted successfully!');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error deleting user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '' });
    setShowAddForm(false);
    setEditingUser(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            👥 Manage Users
          </h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105"
          >
            ➕ Add User
          </button>
        </div>

        {/* Add/Edit Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">
                {editingUser ? 'Edit User' : 'Add New User'}
              </h3>
              <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                    required
                    placeholder="Enter user name"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : (editingUser ? 'Update' : 'Add')}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Users List */}
        <div className="space-y-3">
          {users.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No users found</p>
            </div>
          ) : (
            users.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{user.name}</h4>
                    <p className="text-sm text-purple-600 font-medium">
                      {user.totalPoints || 0} points
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                    disabled={loading}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Users Summary */}
        {users.length > 0 && (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{users.length}</p>
              <p className="text-gray-600">Total Users</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {users.reduce((sum, user) => sum + (user.totalPoints || 0), 0)}
              </p>
              <p className="text-gray-600">Total Points</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {users.length > 0 ? Math.round(users.reduce((sum, user) => sum + (user.totalPoints || 0), 0) / users.length) : 0}
              </p>
              <p className="text-gray-600">Avg Points</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
