import express from "express";

import {
  addAddress,
  editAddress,
  deleteAddress,
  fetchAllAddress,
} from "../../controllers/shop/address-controller.js";

const router = express.Router();

router.post("/add", addAddress);

router.put("/update/:userId/:addressId", editAddress);

router.delete("/delete/:userId/:addressId", deleteAddress);

router.get("/get/:userId", fetchAllAddress);

export default router;
