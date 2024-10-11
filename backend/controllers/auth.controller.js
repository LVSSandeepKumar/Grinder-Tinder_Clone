import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const Signup = async(req, res) => {
    try {
        //Check if all the credentials are provided and read them from request body
        const {name, email, password, age, gender} = req.body;
        if(!name || !email || !password || !age || !gender) {
            res.status(400).json({ message: "Please fill all the fields" });
        }
        //Check if the email is in desired email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ error: "Invalid email format" });
        }
        //Check for the password length
        if(password.length < 6) {
            res.status(400).json({ message: "Password should be atleast 6 characters long" });
        }
        //Check for user's age 
        if(age < 18) {
            res.status(400).json({ message: "Poyi bhAAi ki baanisathvam cheskokunda neeku enduku ra dating" });
        }
        //If all validation checks are passed, create a new user
        const newUser = new User({
            name,
            email,
            password,
            age,
            gender
        });
        //Generate token and send the response to frontend
        generateTokenAndSetCookie(newUser._id, res);
        res.status(201).json({ message: "User created successfully", user: newUser});
    } catch (error) {
        //Error Handling
        console.log("Error in Signup controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}