import { Router } from "express";
import { Login, Signup } from "../controllers/auth.controller.js";

//Setup Express Router
const router = Router();

//Routes for various operations
router.post("/signup", Signup);
router.post("/login", Login);

export default router;