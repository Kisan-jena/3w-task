import { getLeaderboard } from "../controllers/leaderboardController.js";
import express from 'express';

const leaderboardRouter = express.Router();

// Get leaderboard using manual bubble sort
leaderboardRouter.get('/rank', getLeaderboard);


export default leaderboardRouter;