import Rain from "../models/rainModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { getDataToController } from "../utils/rains.js";

const handleRainData = async (data) => {
  try {
    console.log("Handling rain data:", data);
    switch (data.status) {
      case "countdown":
        await saveNewRain(data);
        break;
      case "active":
      case "ended":
        await updateExistingRain(data);
        break;
      default:
        console.log("Unknown rain status:", data.status);
    }
  } catch (error) {
    console.error("Error handling rain data:", error);
  }
};

const saveNewRain = async (data) => {
  const newRain = new Rain({
    amount: data.amount,
    balanceType: data.balanceType,
    createdByUser: data.createdByUser,
    creatorName: data.creatorName,
    creatorUserId: data.creatorUserId,
    id: data.id,
    rainEndTime: data.rainEndTime,
    rainInit: data.rainInit,
    rainStartTime: data.rainStartTime,
    status: data.status,
  });

  await newRain.save();
  console.log("New rain saved to database:", newRain);
};

const updateExistingRain = async (data) => {
  const updatedRain = await Rain.findOneAndUpdate(
    { id: data.id },
    {
      amount: data.amount,
      rainEndTime: data.rainEndTime,
      rainStartTime: data.rainStartTime,
      status: data.status,
    },
    { new: true, runValidators: true }
  );

  if (updatedRain) {
    console.log("Rain updated in database:", updatedRain);
  } else {
    console.log("Rain not found for update. Creating new entry.");
    await saveNewRain(data);
  }
};

// Use getDataToController to receive and handle the data
getDataToController(handleRainData);

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
