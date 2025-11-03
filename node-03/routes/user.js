import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUserById,
  updateUser,
} from "../controller/userController.js";

const router = Router();

router.get("/", getUser);
router.post("/create", createUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
