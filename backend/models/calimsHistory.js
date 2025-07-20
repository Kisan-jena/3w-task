import mongoose from 'mongoose';

const Schema=mongoose.Schema

const historySchema=new Schema({
    userId:{type:String,required:true},
    points:{type:Number,required:true},
    timeStamp:{type:Number,required:true}
})

const claimsHistoryModel=mongoose.models.history || mongoose.model('history',historySchema);

export default claimsHistoryModel;