import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
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

const historyModel = mongoose.model("history", historySchema);

export default historyModel;