import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { updateProfile } from "../controllers/user.controller.js";

const router = Router();

router.put("/update", protectRoute, updateProfile);

export default router;