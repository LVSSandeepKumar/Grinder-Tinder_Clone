import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getMatches, getUserProfiles, swipeLeft, swipeRight } from "../controllers/match.controller.js";

//Setup Express Router
const router = Router();

//Routes for various actions
router.get("/", protectRoute, getMatches);
router.get("/user-profiles", protectRoute, getUserProfiles);

router.post("/swipe-left/:id", protectRoute, swipeLeft);
router.post("/swipe-right/:id", protectRoute, swipeRight);

export default router;