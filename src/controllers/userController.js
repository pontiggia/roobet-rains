import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { getCurrentRainStatus } from "../utils/rains.js";

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

export const createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) return next(new AppError("No user found with that ID", 404));

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) return next(new AppError("No user found with that ID", 404));

  res.status(204).json({
    status: "success",
    data: null,
  });
});

const userClaimedRains = new Map();

export const updateUserCoins = catchAsync(async (req, res, next) => {
  const { rainId } = req.body;
  console.log("Rain ID:", rainId);
  const userId = res.locals.user._id.toString(); // Convertir a string para consistencia

  // Verificar si el userId está presente
  if (!userId) {
    return res.status(401).json({
      status: "error",
      message: "User not authenticated or session expired",
    });
  }

  // Verificar si la rain está activa
  const currentRain = getCurrentRainStatus();
  console.log("Current Rain:", currentRain);
  if (!currentRain || (currentRain.status !== "active" && currentRain.status !== "countdown")) {
    return res.status(400).json({
      status: "error",
      message: "No active rain or invalid rain ID",
    });
  }

  // Verificar si este usuario ya ha reclamado esta rain específica
  if (!userClaimedRains.has(userId)) {
    userClaimedRains.set(userId, new Set());
  }
  const userClaims = userClaimedRains.get(userId);

  if (userClaims.has(rainId)) {
    return res.status(400).json({
      status: "error",
      message: "You have already claimed this rain",
    });
  }

  // Actualizar el usuario
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $inc: { coins: 1 } },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedUser) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  // Marcar esta rain como reclamada por este usuario
  userClaims.add(rainId);

  // Limpiar rains reclamadas antiguas para este usuario después de cierto tiempo
  setTimeout(() => {
    userClaims.delete(rainId);
    if (userClaims.size === 0) {
      userClaimedRains.delete(userId);
    }
  }, 300000); // 5 minutos

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
