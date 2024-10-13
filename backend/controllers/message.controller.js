import Message from "../models/message.model.js";

export const sendMessage = async(req,res) => {
    try {
        //Get message content and receiver Id from req body
        const {content, receiverId} = req.body;
        //Create a new message 
        const newMessage = await Message.create({
            sender: req.user.id,
            receiver: receiverId,
            content
        });
        //Send the message doc in response to frontend
        res.status(201).json({message: newMessage});
    } catch (error) {
        //Error Handling
        console.log("Error in sendMessage controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}