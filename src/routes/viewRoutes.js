import express from "express";
import { getOverview } from "../controllers/viewController.js";

const router = express.Router();

router.get("/test", getOverview);

export default router;