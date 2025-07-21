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


