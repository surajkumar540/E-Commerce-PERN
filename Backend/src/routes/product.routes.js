import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
} from "../controllers/product.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

// Admin only (later role-based)
router.post("/", authMiddleware, createProduct);

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post("/", authMiddleware, upload.single("image"), createProduct);

export default router;
