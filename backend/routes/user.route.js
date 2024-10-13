import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { updateProfile } from "../controllers/user.controller.js";

//Setup Express Router
const router = Router();

//Routes for various actions
router.put("/update", protectRoute, updateProfile);

export default router;