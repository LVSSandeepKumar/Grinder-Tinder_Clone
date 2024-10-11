import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import matchRoutes from "./routes/match.route.js";
import messageRoutes from "./routes/message.route.js";

import connectDB from "./utils/connectDB.js";

dotenv.config();

//Setup express application
const app = express();
const PORT = process.env.PORT;

//middleware functions
app.use(express.json()); //middleware to parse incoming requests with json payloads

//Routing 
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/message", messageRoutes);

//Listen to the application on the assigned port
app.listen(PORT, () => {
    console.log("Server running at", PORT);
    connectDB();
})