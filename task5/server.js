const express = require("express");
const app = express();
const { getUserById } = require("./userService");
const { errorHandler } = require("./errorMiddleware");
const { connect, set } = require("mongoose");
const { upload } = require("../task6/upload");

app.get("/users/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

app.post("/upload", upload.array("images", 10), (req, res) => {
  // Handle each file here
  req.files.forEach((file) => {
    // You can process each file individually
    console.log("upload file", file.originalname);
    // Additional processing logic for each uploaded file
  });
  res.send("file uploaded successfully!");
});

app.use(errorHandler);

app.listen(3000, async () => {
  set("strictQuery", false);
  await connect("mongodb://localhost:27017/testDB");
  console.log("database connected");
  console.log("server run on port 3000");
});
