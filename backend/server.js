import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";

dotenv.config();

//Setup express application
const app = express();
const PORT = process.env.PORT;

//middleware functions
app.use(express.json()); //middleware to parse incoming requests with json payloads

//Listen to the application on the assigned port
app.listen(PORT, () => {
    console.log("Server running at", PORT);
    connectDB();
})