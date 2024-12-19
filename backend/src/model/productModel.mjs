import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
    },
    price_16oz: {
      type: Number,
      required: true,
    },
    price_22oz: {
      type: Number,
      required: true,
    },
    ingredients_16oz : {
      type: Object,
      default: {}
    },
    ingredients_22oz : {
      type: Object,
      default: {}
    },
  }
);

const productModel = mongoose.model("Product", productSchema);

export default productModel;