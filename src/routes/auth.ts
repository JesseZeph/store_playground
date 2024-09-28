import { Router } from "express";
import { login, me, signup } from "../controllers/auth";
import { errorHandler } from "../schema/error-handler";
import authMiddleware from "../middleware/auth";

const authRoutes: Router = Router();

authRoutes.post("/register", errorHandler(signup));
authRoutes.post("/login", errorHandler(login));
authRoutes.post("/me", [authMiddleware], errorHandler(me));

export default authRoutes;
