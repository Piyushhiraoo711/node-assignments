import express from "express";
import verifyToken from "../middleware/verifyToken.js"
import authorizeRoles from "../middleware/authorizeRoles.js";
import { deleteUser } from "../controller/adminController.js";

const router = express.Router();

router.route("/:id").delete(verifyToken, authorizeRoles("admin"), deleteUser);

export default router;