import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    classification: {
      type: String,
      required: true,
      lowercase: true,
    },
  }
);

const inventoryModel = mongoose.model("Inventory", inventorySchema);

export default inventoryModel;
