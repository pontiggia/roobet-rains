// viewRoutes.js
import express from "express";
import { home, getLogin, getRegister, getProfile } from "../controllers/viewController.js";
import { protect, isLoggedIn } from "../controllers/authController.js";

const router = express.Router();

router.get("/", isLoggedIn, home);

router.get("/login", getLogin);
router.get("/register", getRegister);
router.get("/profile", isLoggedIn, getProfile);

export default router;
