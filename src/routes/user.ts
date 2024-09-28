import { Router } from "express";
import authMiddleware from "../middleware/auth";
import { errorHandler } from "../schema/error-handler";
import {
  addAddress,
  deleteAddress,
  listAddress,
  updateUser,
} from "../controllers/user";

const usersRoutes: Router = Router();

usersRoutes.post("/address", [authMiddleware], errorHandler(addAddress));
usersRoutes.get("/address", [authMiddleware], errorHandler(listAddress));
usersRoutes.delete(
  "/address/:id",
  [authMiddleware],
  errorHandler(deleteAddress)
);
usersRoutes.put("/", [authMiddleware], errorHandler(updateUser));

export default usersRoutes;
