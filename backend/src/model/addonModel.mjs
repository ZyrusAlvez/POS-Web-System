import mongoose from "mongoose";

const addonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    ingredients : {
      type: Object,
      default: {}
    },
  }
);

const addonModel = mongoose.model("Add on", addonSchema);

export default addonModel;