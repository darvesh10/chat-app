import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/utils.js";


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

