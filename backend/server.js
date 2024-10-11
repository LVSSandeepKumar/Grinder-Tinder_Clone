import express from "express";
import dotenv from "dotenv";

dotenv.config();

//Setup express application
const app = express();
const PORT = process.env.PORT;

//Listen to the application on the assigned port
app.listen(PORT, () => {
    console.log("Server running at", PORT);
})