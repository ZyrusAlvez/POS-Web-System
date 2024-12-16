import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose"
import inventoryRouter from "./routes/inventoryRoute.mjs";

dotenv.config();

const PORT = process.env.PORT
const DATABASE = process.env.DATABASE
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/inventory", inventoryRouter)

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