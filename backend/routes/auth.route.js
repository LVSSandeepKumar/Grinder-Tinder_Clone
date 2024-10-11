import { Router } from "express";
import { Signup } from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", Signup)

export default router;