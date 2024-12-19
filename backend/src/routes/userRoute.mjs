import userController from "../controller/userController.mjs";
import express from "express"

const userRouter = express.Router()

userRouter.post("/log-in", userController.loginUser);
userRouter.post("/log-out", userController.logout)
userRouter.post("/register", userController.registerUser)
userRouter.get("/check-auth", userController.checkAuth)

export default userRouter