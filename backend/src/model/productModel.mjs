import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    classification: {
      type: String,
      required: true,
      lowercase: true,
    },
    price16oz: {
      type: Number,
      required: true,
    },
    price22oz: {
      type: Number,
      required: true,
    }
  }
);

const productModel = mongoose.model("Product", productSchema);

export default productModel;