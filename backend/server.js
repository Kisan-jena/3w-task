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
    res.send('working')
})

app.listen(port,()=>console.log(`server started on ${port}`))
