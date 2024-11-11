import express from "express";
import { createOrders } from "../../controllers/shop/order-controller.js";

const router = express.Router();

router.post("/create", createOrders);

export default router;
