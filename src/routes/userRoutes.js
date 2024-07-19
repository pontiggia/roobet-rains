import express from "express";
import { getAllUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/userController.js";
import { login, signup, logout, restrictTo, protect } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);

router.use(protect);

router.get("/logout", logout);

router.use(restrictTo("admin"));

router
    .route("/")
    .get(getAllUsers)
    .post(createUser);

router
    .route("/:id")
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);


export default router;