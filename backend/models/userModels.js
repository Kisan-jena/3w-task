import mongoose from 'mongoose';

const Schema=mongoose.Schema

const userSchema=new Schema({
    name:{type:String,required:true},
    totalPoints:{type:Number,required:true}
})

const userModel=mongoose.models.user || mongoose.model('users',userSchema);

export default userModel;