import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userid).select("-password");
        if (!user) {
            return res.status(401).json({ error: "Unauthorized access" });
        };
        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ error: "Unauthorized access" });
    }
}