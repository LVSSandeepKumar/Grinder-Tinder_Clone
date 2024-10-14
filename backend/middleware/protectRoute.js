import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    //Fetch the token from req cookies
    const token = req.cookies.jwt;
    //Return error message incase of no token
    if (!token) {
      return res.status(401).json({
        message: "Not authorized - No token provided",
      });
    };
    console.log("token :", token);
    //Decode the token using jwt.verify() method
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        message: "Not authorized - Invalid token",
      });
    };
    console.log("decoded :", decoded);
    //Find the user with that userId and add the doc to request
    const currentUser = await User.findById(decoded.userId);

    req.user = currentUser;

    console.log("currentUser :", currentUser);

    next();
  } catch (error) {
    console.log("Error in auth middleware: ", error);

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Not authorized - Invalid token",
      });
    } else {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
};
