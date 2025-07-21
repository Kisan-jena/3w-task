# Spin & Win Frontend

A React-based frontend application for the Spin & Win game where users can spin to earn points and compete on a leaderboard.

## Features

### 🎰 Game Section
- **User Selection**: Dropdown to select from available users
- **Spin Animation**: Animated spinner wheel with smooth rotation
- **Random Points**: Generates random points (1-100) for each spin
- **Real-time Updates**: Immediately updates user points and leaderboard

### 🏆 Leaderboard
- **Dynamic Rankings**: Real-time user rankings based on total points
- **Visual Hierarchy**: Special styling for top 3 positions (gold, silver, bronze)
- **Statistics**: Shows total users, total points, and average points
- **Responsive Design**: Works on all screen sizes

### 📊 History
- **Complete Tracking**: Shows all point claims with timestamps
- **Filtering Options**: Filter by all time, today, or last 7 days
- **Detailed Information**: User names, points earned, and claim dates
- **Summary Statistics**: Total claims, points, averages, and highest spin

### 👥 User Management
- **CRUD Operations**: Add, edit, and delete users
- **Form Validation**: Required field validation
- **Modal Interface**: Clean popup forms for user management
- **Real-time Updates**: Automatically refreshes data after changes

## Technology Stack

- **React 19.1.0**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Fetch API**: For backend communication

## Installation & Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Install React Router** (if you want routing):
   ```bash
   npm install react-router-dom @types/react-router-dom
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

## API Integration

The frontend connects to the backend server running on `http://localhost:3000`. Make sure your backend is running before starting the frontend.

### API Endpoints Used:
- `GET /api/users` - Fetch all users
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `POST /api/claims` - Claim points for user
- `GET /api/claims/history` - Get claims history
- `GET /api/leaderboard` - Get leaderboard data

## Project Structure

```
src/
├── components/
│   ├── navbar.jsx          # Navigation bar
│   ├── spinner.jsx         # Game spinner component
│   ├── leaderboard.jsx     # Leaderboard display
│   ├── History.jsx         # Claims history
│   └── UserManagement.jsx  # User CRUD operations
├── services/
│   └── api.js              # API service functions
├── App.jsx                 # Main application component
├── main.jsx               # React entry point
└── index.css              # Global styles
```

## Usage Guide

### Playing the Game
1. Navigate to the "Spin & Win" tab
2. Select a user from the dropdown
3. Click "Spin to Win!" button
4. Watch the animated spinner
5. See the points awarded and automatic leaderboard update

### Managing Users
1. Go to "Manage Users" tab
2. Click "➕ Add User" to create new users
3. Use "✏️ Edit" to modify existing users
4. Use "🗑️ Delete" to remove users (with confirmation)

### Viewing Results
- **Leaderboard**: See real-time rankings with visual indicators
- **History**: Track all point claims with filtering options

## Styling Features

- **Gradient Backgrounds**: Beautiful purple-to-blue gradients
- **Hover Effects**: Interactive button and card animations
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Custom Animations**: Smooth spinner rotation and transitions
- **Modern UI**: Clean, professional interface with emojis for visual appeal

## Environment Variables

Create a `.env` file in the frontend directory if you need to customize the API URL:

```env
VITE_API_URL=http://localhost:3000/api
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Follow the existing code style
2. Use meaningful component and variable names
3. Add comments for complex logic
4. Test thoroughly before submitting changes

## Notes

- The application assumes the backend is running on port 3000
- Make sure CORS is properly configured in your backend
- All data updates are real-time and reflect immediately in the UI
- The spinner animation duration is 3 seconds for optimal user experience
