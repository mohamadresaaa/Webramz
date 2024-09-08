const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    index: true,
  },
});

export const Profile = mongoose.model("Profile", profileSchema);
export const User = mongoose.model("User", userSchema);
