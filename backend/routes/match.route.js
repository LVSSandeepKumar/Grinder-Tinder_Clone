import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getMatches, getUserProfiles, swipeLeft, swipeRight } from "../controllers/match.controller.js";

//Setup Express Router
const router = Router();

//Use authentication middleware to protect routes from unauthorized access
router.use(protectRoute);

//Routes for various actions
router.get("/", getMatches);
router.get("/user-profiles", getUserProfiles);

router.post("/swipe-left/:id", swipeLeft);
router.post("/swipe-right/:id", swipeRight);

export default router;