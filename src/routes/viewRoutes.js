// viewRoutes.js
import express from "express";
import { home, renderBase } from "../controllers/viewController.js";

const router = express.Router();

// router.get("/", renderBase);
router.get("/", home);

export default router;
