import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress } from "@/store/shop/address-slice";

const intialAddressFormData = {
  address: "",
  city: "",
  country: "",
  pincode: "",
  notes: "",
};

const Address = () => {
  const [formData, setFormData] = useState(intialAddressFormData);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  function handleManageAddress(event) {
    event.preventDefault();
    dispatch(addNewAddress({ ...formData, userId: user?.id })).then((data) =>
      console.log(data)
    );
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  return (
    <Card>
      <div className="py-3 ml-4">Address List</div>
      <CardHeader>
        <CardTitle>Add New Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={"Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
