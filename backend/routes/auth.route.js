import { Router } from "express";
import { getMe, Login, Logout, Signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

//Setup Express Router
const router = Router();

//Routes for various operations
router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);
router.get("/me", protectRoute, getMe);

export default router;