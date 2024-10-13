import cloudinary from "../utils/cloudinary.js";
import User from "../models/user.model.js";

export const updateProfile = async (req, res) => {
	try {
        //Gather user details from req body
		const { image, ...otherData } = req.body;

		let updatedData = otherData;
        //If there is image, upload it to cloudinary and get image url
		if (image) {
			// base64 format
			if (image.startsWith("data:image")) {
				try {
					const uploadResponse = await cloudinary.uploader.upload(image);
					updatedData.image = uploadResponse.secure_url;
				} catch (error) {
					console.error("Error uploading image:", uploadError);

					return res.status(400).json({
						message: "Error uploading image",
					});
				}
			}
		}

        //Find the user and update details
		const updatedUser = await User.findByIdAndUpdate(req.user._id, updatedData, { new: true });

		res.status(200).json({
			user: updatedUser,
		});
	} catch (error) {
		console.log("Error in updateProfile: ", error);
		res.status(500).json({
			message: "Internal server error",
		});
	}
};