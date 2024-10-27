import { Card } from "@/components/ui/card";
import React from "react";

const ShoppingProductTile = ({ product }) => {
    return <Card className="w-full max-w-sm mx-auto">
        <div>
            <div className="relative">
                <img src={ product?.image} />
            </div>
      </div>
  </Card>;
};

export default ShoppingProductTile;
