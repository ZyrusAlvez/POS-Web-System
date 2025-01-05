import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import inventoryRouter from "./routes/inventoryRoute.mjs";
import productRouter from "./routes/productRoute.mjs";
import userRouter from "./routes/userRoute.mjs";
import addonRouter from "./routes/addonRoute.mjs";
import historyRouter from "./routes/sales/historyRoute.mjs";

dotenv.config();

const PORT = process.env.PORT
const DATABASE = process.env.DATABASE
const app = express();

app.use(cookieParser()); // Add this middleware to parse cookies
app.use(
  cors({
    origin: true, // Allow all origins
    credentials: true, // Allow cookies and credentials
  })
);
app.use(express.json());

app.use("/api/inventory", inventoryRouter)
app.use("/api/product", productRouter)
app.use("/api/user", userRouter)
app.use("/api/add-on", addonRouter)
app.use("/api/sales/history", historyRouter)

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