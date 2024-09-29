import { Router } from "express";
import authMiddleware from "../middleware/auth";
import { errorHandler } from "../schema/error-handler";
import {
  addAddress,
  changeUserRole,
  deleteAddress,
  getUserById,
  listAddress,
  listUsers,
  updateUser,
} from "../controllers/user";
import adminMiddleware from "../middleware/admin";

const usersRoutes: Router = Router();

usersRoutes.post("/address", [authMiddleware], errorHandler(addAddress));
usersRoutes.get("/address", [authMiddleware], errorHandler(listAddress));
usersRoutes.delete(
  "/address/:id",
  [authMiddleware],
  errorHandler(deleteAddress)
);
usersRoutes.put("/", [authMiddleware], errorHandler(updateUser));
usersRoutes.put(
  "/:id/role",
  [authMiddleware, adminMiddleware],
  errorHandler(changeUserRole)
);
usersRoutes.get(
  "/",
  [authMiddleware, adminMiddleware],
  errorHandler(listUsers)
);
usersRoutes.get(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(getUserById)
);

export default usersRoutes;
