import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    bio: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    disikes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    matches: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
}, {timestamps: true});


//Pre method used to implement some function on data before saving to db
userSchema.pre("save", async function(next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

//MatchPassword method is added to verify the user password with entered password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

//User Model defined with user schema 
const User = mongoose.model("User", userSchema);

export default User;