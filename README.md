# 3W Tasks - Points Claiming System

A full-stack web application for managing users and claiming points. Users can spin for random points and admins can manage users.

## 🚀 Features

- **User Management**: Add, edit, and delete users
- **Points Claiming**: Spin a wheel to randomly generate points (1-10) and claim them
- **Leaderboard**: View top users ranked by their total points
- **History Tracking**: Check the history of all claimed points for each user

## 🛠️ Tech Stack

### Frontend
- React with Vite
- React Router v6 for navigation
- Context API for global state management
- Tailwind CSS for styling
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB for data storage
- RESTful API architecture

## 📋 Project Structure

```
├── backend/                 # Backend code
│   ├── config/              # Database configuration
│   ├── controllers/         # Request handlers
│   ├── models/              # Database models
│   └── routes/              # API routes
└── frontend/                # Frontend code
    ├── components/          # Reusable UI components
    │   ├── layout/          # Layout components (Navbar, etc.)
    │   └── shared/          # Shared components (Button, Dropdown, etc.)
    ├── context/             # React context for global state
    ├── pages/               # Page components
    └── services/            # API services
```

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- Bun (optional)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Kisan-jena/3w-task.git
   cd 3w_tasks
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   # or with Bun
   bun install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   # or with Bun
   bun install
   ```

4. Set up environment variables:
   - Create a `.env` file in the backend directory with:
     ```
     MONGODB_URI=your_mongodb_connection_string
     PORT=3000
     ```
   - Create a `.env` file in the frontend directory with:
     ```
     VITE_API_URL=http://localhost:3000
     ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   # or with Bun
   bun run server.js
   ```

2. Start the frontend development server:
   ```bash
   cd ../frontend
   npm run dev
   # or with Bun
   bun run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` (or the port Vite assigns)

## 📱 Application Pages

### Home
- Select a user
- Spin for random points (1-10)
- Claim points for the selected user

### Leaderboard
- View all users ranked by their total points

### History
- Select a user to view their claim history
- See detailed information about each claim (points and timestamp)

### User Management
- Add new users to the system
- Edit existing users
- Delete users

## 💾 Data Models

### User
- name: String
- totalPoints: Number

### Claim History
- userId: String
- points: Number
- timeStamp: Number

## 📚 API Endpoints

### Users
- `GET /users`: Get all users
- `POST /users`: Create a new user
- `PUT /users/:id`: Update a user
- `DELETE /users/:id`: Delete a user

### Claims
- `POST /claim/:userId`: Claim points for a user
- `GET /claim/history/:userId`: Get claim history for a user

### Leaderboard
- `GET /leaderboard/rank`: Get users ranked by points

## 🧑‍💻 Contributors
- Kisan-jena

## 📄 License
MIT License

