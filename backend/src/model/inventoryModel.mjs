import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
    },
    numerator : {
      type: Number,
      default: 0
    },
    denominator : {
      type: Number,
      default: 0
    },
    unit : {
      type: String,
      default: "Pack"
    },
  }
);

const inventoryModel = mongoose.model("Inventory", inventorySchema);

export default inventoryModel;
