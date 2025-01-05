import mongoose from "mongoose";

const salesSchema = new mongoose.Schema(
  {
    billing: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    mop: {
      type: String,
      required: true,
    },
    ref: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  }
);

const salesModel = mongoose.model("sales", salesSchema);

export default salesModel;