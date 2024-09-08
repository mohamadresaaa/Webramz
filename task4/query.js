const { User } = require("../models");

export const getUsersWithProfiles = async () => {
  try {
    const users = await User.find({}).populate("profile").lean();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};
