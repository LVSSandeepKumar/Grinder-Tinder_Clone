import { Router } from "express";
import { Login, Logout, Signup } from "../controllers/auth.controller.js";

//Setup Express Router
const router = Router();

//Routes for various operations
router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);

export default router;