import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { updateProfile } from "../controllers/user.controller.js";

//Setup Express Router
const router = Router();

//Use authentication middleware to protect routes from unauthorized access
router.use(protectRoute);

//Routes for various actions
router.put("/update", updateProfile);

export default router;