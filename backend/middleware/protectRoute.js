import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    //Check if the user has a token in their request cookies and fetch it
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(400).json({ error: "Unauthorized: No token provided" });
    }
    //Decode the token with JWT_SECRET we have
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(400).json({ error: "Unauthorized: Invalid token provided" });
    }
    //Check for the user with the userId for which the token is assigned
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.staus(404).json({ error: "User not found" });
    }
    //Set the request user as our database user for better accessibility throughout the client-side application
    req.user = user;
    next();
  } catch (error) {
    //Error handling
    console.log(`Error in protectRoute Middleware, ${error.message}`);
    return res.status(500).json({
      error: "Internal Server Error.",
    });
  }
};
