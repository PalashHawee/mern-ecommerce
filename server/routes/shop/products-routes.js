import express from "express";
import { getFilteredProducts } from "../../controllers/shop/products-controller.js";

const router = express.Router();

// Route for fetching filtered product

router.get("/get", getFilteredProducts);

export default router;
