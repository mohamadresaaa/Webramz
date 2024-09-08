const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: String,
  quantity: Number,
});
orderSchema.index({ userId: 1 });

export const User = mongoose.model("User", userSchema);
export const Order = mongoose.model("Order", orderSchema);

const ordersWithUsers = await Order.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userInfo",
    },
  },
  {
    $unwind: "$userInfo",
  },
  {
    $project: {
      _id: 1,
      product: 1,
      quantity: 1,
      "userInfo.name": 1,
      "userInfo.email": 1,
    },
  },
]).exec();
