import express from "express";
import {
  getFilteredProducts,
  getProductDetails,
} from "../../controllers/shop/products-controller.js";

const router = express.Router();

// Route for fetching filtered product
router.get("/get", getFilteredProducts);

// Route for fetching product details
router.get("/get/:id", getProductDetails);

export default router;
