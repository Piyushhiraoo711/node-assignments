import express from "express";

import { productSchemaValidate } from "../modelValidation/productValidationModelJoi.js";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductById,
  updateProduct,
} from "../controller/productController.js";
import verifyToken from "../middleware/verifyToken.js";
import authorizeRoles from "../middleware/authorizeRoles.js";
import { validateProductjoi } from "../validation/validateProductJoi.js";

const router = express.Router();

router.route("/").get(getProduct);

router.route("/create").post(verifyToken, validateProductjoi(productSchemaValidate), authorizeRoles("seller"), createProduct);

router.route("/:id").put(verifyToken, authorizeRoles("seller", "admin"), updateProduct);

router.route("/:id").get(verifyToken, getProductById);

router.route("/:id").delete(verifyToken, authorizeRoles("seller", "admin"), deleteProduct);

export default router;
