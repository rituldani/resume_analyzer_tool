import express from "express";
import { Router } from "express";
import {Login, Signup, Logout } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);

// router.route("/register").post(registerUser)

export default router;