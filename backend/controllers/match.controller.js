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
};

export const getUserProfiles = async(req,res) => {
    try {
        //Get the current user by using userId in req
        const currentUser = await User.findById(req.user._id);
        //Find the user profiles with certain filters
        const users = await User.find({
            $and: [
                {_id: {$ne: currentUser.id}},
                {_id: {$nin: currentUser.likes}},
                {_id: {$nin: currentUser.disikes}},
                {_id: {$nin: currentUser.matches}},
                {gender: currentUser.gender === "male" ? {$in: ["female"]} : {$in: ["male"]}}
            ]
        });
        //Send the user doc as a response to frontend
        res.status(200).json({users});
    } catch (error) {
        //Error Handling
        console.log("Error in getUserProfiles controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const swipeLeft = async(req, res) => {
    try {
        //Get the disliked userId from params
        const {id: disLikedUserId} = req.params;
        //Get current user with the Id in req
        const currentUser = await User.findById(req.user.id);
        //Add the Id in params to currentUser dislikes array
        currentUser.disikes.push(disLikedUserId);
        await currentUser.save();
        //Send the updated doc in response to frontend
        res.status(200).json(currentUser);
    } catch (error) {
        //Error Handling
        console.log("Error in swipeLeft controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}