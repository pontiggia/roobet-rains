// viewRoutes.js
import express from "express";
import { home, getLogin, getRegister } from "../controllers/viewController.js";
import { protect, isLoggedIn } from "../controllers/authController.js";

const router = express.Router();

router.get("/", isLoggedIn, home);

router.get("/login", getLogin);
router.get("/register", getRegister);

export default router;
