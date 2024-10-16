import User from "../models/user.model.js";
import { getConnectedUsers, getIO } from "../socket/socket.server.js";

export const getMatches = async (req, res) => {
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

export const getUserProfiles = async (req, res) => {
  try {
    //Get the current user by using userId in req
    const currentUser = await User.findById(req.user._id);
    //Find the user profiles with certain filters
    const users = await User.find({
      $and: [
        { _id: { $ne: currentUser.id } },
        { _id: { $nin: currentUser.likes } },
        { _id: { $nin: currentUser.disikes } },
        { _id: { $nin: currentUser.matches } },
        {
          gender:
            currentUser.gender === "male"
              ? { $in: ["female"] }
              : { $in: ["male"] },
        },
      ],
    });
    //Send the user doc as a response to frontend
    res.status(200).json({ users });
  } catch (error) {
    //Error Handling
    console.log("Error in getUserProfiles controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const swipeLeft = async (req, res) => {
  try {
    //Get the disliked userId from params
    const { id: disLikedUserId } = req.params;
    //Get current user with the Id in req
    const currentUser = await User.findById(req.user.id);
    //Add the Id in params to currentUser dislikes array
    if (!currentUser.disikes.includes(disLikedUserId)) {
      currentUser.disikes.push(disLikedUserId);
      await currentUser.save();
    }
    //Send the updated doc in response to frontend
    res.status(200).json(currentUser);
  } catch (error) {
    //Error Handling
    console.log("Error in swipeLeft controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const swipeRight = async(req,res) => {
    try {
        //Get the current user and liked user details from db
        const {id: likedUserId} = req.params;
        const likedUser = await User.findById(likedUserId);
        const currentUser = await User.findById(req.user.id);
        //Add the liked user id to current user's likes array if it doesn't exist already
        if(!currentUser.likes.includes(likedUserId)) {
            currentUser.likes.push(likedUserId);
            await currentUser.save();
            //Check if the other user also liked this profile and create a match
            if(likedUser.likes.includes(currentUser.id)) {
                //Update the matches for both users
                currentUser.matches.push(likedUserId);
                likedUser.matches.push(currentUser.id);
                //Save the updates
                await Promise.all([
                    await currentUser.save(),
                    await likedUser.save()
                ])
                //Alert user about match using socket
                const connectedUsers = getConnectedUsers();
                const io = getIO();
                //Update likedUser with currentUser details
                const likedUserSocketId = connectedUsers.get(likedUserId);

                if(likedUserSocketId) {
                  io.to(likedUserSocketId).emit("newMatch", {
                    _id: currentUser._id,
                    name: currentUser.name,
                    image: currentUser.image
                  });
                }
                //Update currentUser with likedUser details
                const currentUserSocketId = connectedUsers.get(currentUser._id.toString());

                if(currentUserSocketId) {
                  io.to(currentUserSocketId).emit("newMatch", {
                    _id: likedUser._id,
                    name: likedUser.name,
                    image: likedUser.image
                  });
                }
            }
        }
        //Send the current user in response to client
        res.status(200).json({user: currentUser});
    } catch (error) {
        //Error Handling
        console.log("Error in swipeRight controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}