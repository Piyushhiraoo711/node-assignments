import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUserById,
  loginUser,
  logoutUser,
  updateUser,
} from "../controller/userController.js";
import verifyToken from "../middleware/verifyToken.js";
import { validateUserjoi} from "../validation/validateUserJoi.js"
import { userSchemaValidate } from "../modelValidation/userValidationModelJoi.js";

const router = express.Router();

router.route("/").get(getUser);
router.route("/register").post(validateUserjoi(userSchemaValidate), createUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/:id").get(getUserById);
router.route("/:id").put(verifyToken, updateUser);
router.route("/:id").delete(deleteUser);

// router.get("/", getUser);
// router.post("/register", createUser);
// router.post("/login", verifyToken, loginUser);
// router.get("/:id", getUserById);
// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);

export default router;
