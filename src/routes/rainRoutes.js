import express from "express";
import { getRain, getRains } from "../controllers/rainController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

router.use(restrictTo("admin"));
router.route("/").get(getRains);

router.route("/:id").get(getRain);

export default router;