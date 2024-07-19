import Rain from "../models/rainModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { connect } from "../utils/rains.js";

//connect();

export const getRains = catchAsync(async (req, res, next) => {
  const rains = await Rain.find();

  res.status(200).json({
    status: "success",
    results: rains.length,
    data: {
      rains,
    },
  });
});

export const getRain = catchAsync(async (req, res, next) => {
  const rain = await Rain.findById(req.params.id);

  if (!rain) {
    return next(new AppError("No rain found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      rain,
    },
  });
});