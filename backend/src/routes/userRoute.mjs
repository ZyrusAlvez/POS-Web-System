import userController from "../controller/userController.mjs";
import express from "express"

const userRouter = express.Router()

userRouter.post("/log-in", userController.loginUser);
userRouter.post("/log-out", userController.logout)
userRouter.post("/register", userController.registerUser)
userRouter.get("/check-auth", userController.checkAuth)
userRouter.delete("/delete-user/:id", userController.deleteUser)
userRouter.get("/get-all-users", userController.getAllUsers)
userRouter.get("/get-user/:id", userController.getUser)
userRouter.put("/reset-sales/:id", userController.resetSales)
userRouter.put("/add-cash-sales/:id", userController.addCashSales)
userRouter.put("/add-gcash-sales/:id", userController.addGcashSales)
userRouter.put("/updateName-by-id/:_id", userController.updateNameById)

export default userRouter