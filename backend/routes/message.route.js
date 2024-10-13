import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getConversation, sendMessage } from "../controllers/message.controller.js";

//Setup Express Router
const router = Router();

//Use authentication middleware to protect routes from unauthorized access
router.use(protectRoute);

//Routes for various actions
router.post("/send", sendMessage);
router.get("/conversation/:userId", getConversation);

export default router;