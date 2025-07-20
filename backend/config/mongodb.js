import mongoose from "mongoose";
import dotenv from 'dotenv';


dotenv.config()

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('mongodb conected')
    } catch (error) {
        console.error('mongodb connected error',error)        
    }
}

export default connectDB