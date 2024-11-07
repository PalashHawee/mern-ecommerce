import React from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";

const AdminOrderDetailsView = () => {
  return (
    <DialogContent>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <p className="font-medium">ORDER ID</p>
            <Label>7778889</Label>
          </div>
        </div>
      </div>
      ;
    </DialogContent>
  );
};

export default AdminOrderDetailsView;
