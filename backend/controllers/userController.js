import userModel from "../models/userModels.js";

const adduserName=async(req, res)=>{
    try {
        const {name}=req.body
        if (!name){
            return res.status(400).json({message:'name is required'})
        }
        const user=await userModel.create({name:name,totalPoints:0})
        res.status(201).json({message:'user addded',user})
    } catch (error) {
        res.status(500).json({message:'server error',error})
    }
}

const deleteuserName = async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted", deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const edituserName=async(req, res)=>{
    try {
        const {userId}=req.params
        const {new_name}=req.body

    if (!new_name){
        return res.status(400).json({message:'name is required'})
    }

    const updatedUser=await userModel.findByIdAndUpdate(
        userId,
        {name:new_name},
        {new:true}
    )
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({message:'user updated',updatedUser})
    } catch (error) {
        res.status(500).json({message:'server error',error})
    }

}

const allUser=async(req,res)=>{
    try {
        const users = await userModel.find(); // Gets all users from DB
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}



export {adduserName,edituserName,deleteuserName,allUser}