import User from "../models/user.model.js";

export const getMatches = async(req,res) => {
    try {
        //Find the user with userId from req
        const userId = req.user._id;
        const user = await User.findById(userId).populate("matches", "name image");
        //Send the user doc in response to frontend
        res.status(200).json({ matches: user.matches });
    } catch (error) {
        //Error Handling
        console.log("Error in getMatches controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}