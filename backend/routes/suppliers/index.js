import express from "express";
import {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
} from "../../controllers/suppliers/index.js";
const router = express.Router();

router.get("/", getAllSuppliers);

router.get("/:supplierId", getSupplierById);

router.post("/", createSupplier);

export default router;
