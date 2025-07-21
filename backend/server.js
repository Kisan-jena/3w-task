// simple backend init
import express from 'express';
import cors from 'cors';

import connectDB from './config/mongodb.js';
import userRouter from './routes/usersRoutes.js';
import claimRouter from './routes/claimRoutes.js';
import leaderboardRouter from './routes/leaderboardRoutes.js';

const app=express()
const port=3000
connectDB()

app.use(express.json())
app.use(cors())

app.use('/api/user',userRouter)
app.use('/api/claim',claimRouter)
app.use('/api/leaderboard',leaderboardRouter)

// testing connection of server
app.get('/',(req,res)=>{
    res.json({
        message: 'Leaderboard Task Backend API is working!',
        availableEndpoints: {
            users: {
                'GET /api/user/alluser': 'Get all users',
                'POST /api/user/add': 'Add new user (Body: {name})',
                'PUT /api/user/edit/:userId': 'Edit user (Body: {new_name})',
                'DELETE /api/user/delete/:userId': 'Delete user'
            },
            claims: {
                'POST /api/claim/:userId': 'Claim points (Body: {points: 1-10})',
                'GET /api/claim/history/:userId': 'Get user claim history'
            },
            leaderboard: {
                'GET /api/leaderboard': 'Get leaderboard (sorted by highest points)'
            }
        },
        taskFeatures: {
            userManagement: ' Add/Edit/Delete users',
            randomPoints: ' Claim 1-10 random points',
            claimsHistory: ' Track all claim history',
            leaderboard: ' Dynamic rankings with bubble sort',
            database: ' MongoDB with proper collections'
        }
    });
})

app.listen(port,()=>console.log(`server started on ${port}`))
