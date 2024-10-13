import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getMatches } from "../controllers/match.controller.js";

//Setup Express Router
const router = Router();

//Routes for various actions
router.get("/", protectRoute, getMatches)

export default router;