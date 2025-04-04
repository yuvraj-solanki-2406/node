const express = require("express");
const { createUser, loginUser, getFileInformation, hashFileContent, getAllUsers } = require("./controller");
const { authenticate, authorize } = require("../../middlewares/authMiddleware");
const { uploadMiddleware } = require("../../middlewares/fileUpload");

const userRouter = express.Router();

userRouter.post("/create-user", createUser);
userRouter.post("/login", loginUser);
userRouter.post("/read-file", authenticate, uploadMiddleware, getFileInformation);
userRouter.post("/hash", authenticate, uploadMiddleware, hashFileContent);
userRouter.get("/all-users", authenticate, authorize("admin"), getAllUsers);

module.exports = { userRouter };
