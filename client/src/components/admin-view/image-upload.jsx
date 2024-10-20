import React from "react";
import { Label } from "../ui/label";
import { Input } from "postcss";

const ProductImageUplaod = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div>
        <Input id="image-uplaod" type="file" className="hidden" />
      </div>
    </div>
  );
};

export default ProductImageUplaod;
