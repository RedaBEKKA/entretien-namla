import express from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
} from "../../controllers/orders/index.js";
import { body } from "express-validator";

const router = express.Router();

router.get("/", getAllOrders);

router.get(
  "/:orderId",

  getOrderById
);

router.post(
  "/create",

  createOrder
);

export default router;
