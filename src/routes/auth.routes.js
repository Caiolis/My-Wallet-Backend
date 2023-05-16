import { Router } from "express";

// Controllers
import { Signup } from "../controllers/auth.controller.js";

// Middlewares
import { validateSchema } from "../middlewares/validateSchema.middleware.js";

// Schemas
import { signupSchema } from "../schemas/auth.schema.js";

const authRoute = Router();

authRoute.post('/signup', validateSchema(signupSchema), Signup);

export default authRoute;