import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {createServer} from "http";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import matchRoutes from "./routes/match.route.js";
import messageRoutes from "./routes/message.route.js";

import connectDB from "./utils/connectDB.js";
import cookieParser from "cookie-parser";
import { initializeSocket } from "./socket/socket.server.js";
import path from "path";

dotenv.config();

//Setup express application
const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT;

const __dirname = path.resolve();

//middleware functions
app.use(express.json()); //middleware to parse incoming requests with json payloads
app.use(cookieParser()); //middleware to parse incoming requests with cookies
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));                    //middleware to avoid cors errors

//Initialize socket server
initializeSocket(httpServer);

//Routing 
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/message", messageRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

//Listen to the application on the assigned port
httpServer.listen(PORT, () => {
    console.log("Server running at", PORT);
    connectDB();
})