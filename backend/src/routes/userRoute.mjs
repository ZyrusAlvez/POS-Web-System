import userController from "../controller/userController.mjs";
import express from "express"

const userRouter = express.Router()

userRouter.post("/log-in", userController.loginUser);
userRouter.post("/register", userController.registerUser)

export default userRouter