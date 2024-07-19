import express from "express";
import { getRain, getRains } from "../controllers/rainController.js";

const router = express.Router();

router.route("/").get(getRains);

router.route("/:id").get(getRain);

export default router;