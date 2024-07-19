import mongoose from "mongoose";

const rainSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, "A rain must have an amount"],
  },
  balanceType: {
    type: String,
  },
  createdByUser: {
    type: Boolean,
    default: false,
  },
  creatorName: {
    type: String,
  },
  creatorUserId: {
    type: String,
  },
  id: {
    type: String,
  },
  rainEndTime: {
    type: Date,
  },
  rainInit: {
    type: Date,
  },
  rainStartTime: {
    type: Date,
  },
  status: {
    type: String,
  },
});


const Rain = mongoose.model("Rain", rainSchema);

export default Rain;