import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    brand: String,
    category: String,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);   

export default Product;