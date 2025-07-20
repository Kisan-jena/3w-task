import { adduserName,edituserName,deleteuserName,allUser } from "../controllers/userController.js";
import express from 'express'

const userRouter=express.Router()

userRouter.post('/add',adduserName)
userRouter.put('/edit/:userId',edituserName)
userRouter.delete('/delete/:userId',deleteuserName)
userRouter.get('/alluser',allUser)

export default userRouter