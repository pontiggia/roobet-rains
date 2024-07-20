// viewRoutes.js
import express from "express";
import { home, getLogin, getRegister } from "../controllers/viewController.js";

const router = express.Router();

router.get("/", home);

router.get("/login", getLogin);
router.get("/register", getRegister);

export default router;
