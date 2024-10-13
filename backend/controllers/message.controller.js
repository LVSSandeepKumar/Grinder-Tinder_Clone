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
};

export const getConversation = async(req,res) => {
    try {
        //Read the userId with whom we want to retrieve our conversation
        const {userId} = req.params;
        //Find all messages including both users
        const messages = await Message.find({
            $or: [
                {sender: req.user.id, receiver: userId},
                {sender: userId, receiver: req.user.id}
            ]
        }).sort("createdAt");
        //Send the messages in response to frontend
        res.status(200).json({messages});
    } catch (error) {
        //Error Handling
        console.log("Error in getConversation controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};