import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import inventoryRouter from "./routes/inventoryRoute.mjs";
import productRouter from "./routes/productRoute.mjs";
import userRouter from "./routes/userRoute.mjs";
import addonRouter from "./routes/addonRoute.mjs";
import salesRouter from "./routes/salesRoute.mjs";

dotenv.config();

const PORT = process.env.PORT
const DATABASE = process.env.DATABASE
const app = express();

app.use(cookieParser()); // Add this middleware to parse cookies

// const allowedOrigins = [
//   'http://localhost:5173',
//   'https://pos-web-system.vercel.app'
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true, // Allow cookies and credentials
//   })
// );

app.use(
  cors({
    origin: true,
    credentials: true, // Allow cookies and credentials
  })
);

app.use(express.json());

app.use("/api/inventory", inventoryRouter)
app.use("/api/product", productRouter)
app.use("/api/user", userRouter)
app.use("/api/add-on", addonRouter)
app.use("/api/sales", salesRouter)

mongoose
  .connect(DATABASE)
  .then(() => {
    console.log("connected to database")

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  })
  .catch((error) => {
    console.log("Database connection error:", error)
  })