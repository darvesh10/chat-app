import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/utils.js";
import cloudinary from "../config/cloudinary.js";


export const signup = async (req, res) => {
    const { fullName, email, password, bio } = req.body;
    
    try {
        if(!fullName || !email || !password || !bio)  {
            return res.status(400).json({ error: "All fields are required" });
          }
          const user = await User.findOne({email});
          if(user){
            return res.status(400).json({ error: "User already exists" });
          }
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            bio,
          });
          const token = generateToken(newUser._id);
          res.json({sucess: true, userData: newUser, token, message: "User created successfully"});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const login = async (req, res) => {
  try{
    const [ email, password ] = req.body;
    const userData = await User.findOne({ email });
    const ispasswordValid = await bcrypt.compare(password, userData.password);
    if( !ispasswordValid){
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const token = generateToken(userData._id);
    res.json({ success: true, userData, token, message: "Login successful" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  };
}

export const checkAuth =(req,res)=>{
  res.json({ success: true, user: req.user });
}


export const updateProfile = async (req, res) => {
  
  try {
    const { fullName, profilePic, bio } = req.body;
    const userId = req.user._id;
    let updatedUser;
   
     if(!profilePic){
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { fullName, bio },
        { new: true }
      );
     } else {
      const upload = await cloudinary.uploader.upload(profilePic);
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { fullName, profilePic: upload.secure_url, bio },
        { new: true }
      );
     }
   
    res.json({ success: true, userData: updatedUser, message: "Profile updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}