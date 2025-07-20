// simple backend init
import express from 'express';
import cors from 'cors';

import connectDB from './config/mongodb.js';
import userRouter from './routes/usersRoutes.js';

const app=express()
const port=3000
connectDB()

app.use(express.json())
app.use(cors())

app.use('/api/user',userRouter)

// testing connection of server
app.get('/',(req,res)=>{
    res.send('working')
})

app.listen(port,()=>console.log(`server started on ${port}`))
