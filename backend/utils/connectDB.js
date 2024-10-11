import mongoose from "mongoose";

const connectDB = async() => {
    try {
        //Connect to Database through URI
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected", conn.connection.host);
    } catch (error) {
        //Error Handling
        console.log("Error connecting MongoDB", error);
        process.exit(1);
    }
}

export default connectDB;