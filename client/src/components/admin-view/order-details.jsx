import React, { useState } from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "../common/form";

const initialFormData = {
  status: "",
};

const AdminOrderDetailsView = () => {
  const [formData, setFormData] = useState(initialFormData);

  function handleUpdateStatus(event) {
    event.preventDefault()
  }

  return (
    <DialogContent className=" sm:max-w-[600px] bg-white">
      <div className="grid gap-6 ">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">ORDER ID</p>
            <Label>7778889</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">ORDER DATE</p>
            <Label>7/7/2024</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">ORDER PRICE</p>
            <Label>$400</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">ORDER STATUS</p>
            <Label>In Progress</Label>
          </div>
        </div>
        <Separator className="bg-purple-700" />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span>Product One</span>
                <span>$100</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-gray-700">
              <span>John Doe</span>
              <span>Address</span>
              <span>City</span>
              <span>Country</span>
              <span>Phone</span>
              <span>Pin Code</span>
              <span>Notes</span>
            </div>
          </div>
        </div>
        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetailsView;
