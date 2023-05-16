import { Router } from "express";

// Routes
import authRoute from "./auth.routes.js";

const router = Router();
router.use(authRoute);

export default router;