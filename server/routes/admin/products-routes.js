import express from "express";
import { handleImageUpload } from "../../controllers/admin/products-controller.js";
import { upload } from "../../helpers/cloudinary.js";

const router = express.Router();

// Route for uploading product images

router.post("/upload-image", upload.single("my_file"), handleImageUpload);

export default router;
