import { Router } from "express";

// Controllers
import { signup, signin } from "../controllers/auth.controller.js";

// Middlewares
import { validateSchema } from "../middlewares/validateSchema.middleware.js";

// Schemas
import { signupSchema, loginSchema } from "../schemas/auth.schema.js";

const authRoute = Router();

authRoute.post('/sign-up', validateSchema(signupSchema), signup);
authRoute.post('/sign-in', validateSchema(loginSchema), signin);

export default authRoute;