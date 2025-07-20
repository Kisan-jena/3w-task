import mongoose from 'mongoose';

const Schema=mongoose.Schema

const userSchema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    date:{type:Number,required:true}
})

const userModel=mongoose.models.user || mongoose.model('user',userSchema);

export default userModel;