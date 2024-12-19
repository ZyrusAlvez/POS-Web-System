import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import inventoryRouter from "./routes/inventoryRoute.mjs";
import productRouter from "./routes/productRoute.mjs";
import userRouter from "./routes/userRoute.mjs";

dotenv.config();

const PORT = process.env.PORT
const DATABASE = process.env.DATABASE
const app = express();

app.use(cookieParser()); // Add this middleware to parse cookies
app.use(
  cors({
    origin: "http://localhost:5174", // Explicitly allow your frontend's origin
    credentials: true, // Allow cookies and credentials
  })
);
app.use(express.json());

app.use("/api/inventory", inventoryRouter)
app.use("/api/product", productRouter)
app.use("/api/user", userRouter)

mongoose
  .connect(DATABASE)
  .then(() => {
    console.log("connected to database")

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  })
  .catch((error) => {
    console.log("Database connection error:", error)
  })