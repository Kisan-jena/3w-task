import { claimPoints, getUserClaimHistory } from "../controllers/claimController.js";
import express from 'express';

const claimRouter = express.Router();

claimRouter.post('/:userId', claimPoints);
claimRouter.get('/history/:userId', getUserClaimHistory);

export default claimRouter;
