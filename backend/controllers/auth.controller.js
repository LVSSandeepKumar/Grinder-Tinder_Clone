import bcrypt from "bcryptjs";

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
            res.status(400).json({ message: "User must be above 18" });
        }
        //Check if there is already a user with email and send a warning message
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            res.status(401).json({ message: "User already exists with given email" });
        }
        //Hash password before saving the user doc to db
        const hashedPassword = await bcrypt.hash(password, 10);
        //If all validation checks are passed, create a new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            age,
            gender
        });
        //Generate token and send the response to frontend
        generateTokenAndSetCookie(newUser._id, res);
        res.status(201).json({ message: "User created successfully", user: {
            ...newUser._doc,
            password: null
        }});
    } catch (error) {
        //Error Handling
        console.log("Error in Signup controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const Login = async(req, res) => {
    try {
        //Check if all credentials are passed and read them from request body
        const { email, password } = req.body;
        if(!email || !password) {
            res.status(400).json({ message: "Please fill both the fields" });
        }
        //Find the user with the email
        const user = await User.findOne({email});
        if(!user) {
            res.status(404).json({ message: "No user is registered with this email" });
        }
        //Check if the user has entered correct password
        const correctPassword = await bcrypt.compare(password, user.password);
        if(!correctPassword) {
            res.status(400).json({ message: "Incorrect Password" });
        }
        //Generate Token and send the user doc in response to frontend
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({ message: "Login Successful", user: {
            ...user._doc,
            password: null
        } });
    } catch (error) {
        //Error Handling
        console.log("Error in Login controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const Logout = async (req,res) => {
    try {
        //Clear the cookie from response header and send success message to frontend
        res.clearCookie("jwt");
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        //Error Handling
        console.log("Error in Logout controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMe = async(req, res) => {
    try {
        //Get the details of currently active user
        const user = req.user;
        res.status(200).json({user});
    } catch (error) {
        //Error Handling
        console.log("Error in getMe controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}