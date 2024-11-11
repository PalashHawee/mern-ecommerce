import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { useToast } from "@/hooks/use-toast";

const intialAddressFormData = {
  address: "",
  city: "",
  country: "",
  pincode: "",
  notes: "",
};

const Address = ({ setCurrentSelectedAddress }) => {
  const [formData, setFormData] = useState(intialAddressFormData);
  const [currentEditedAddress, setCurrentEditedAddress] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();

  function handleManageAddress(event) {
    event.preventDefault();
    if (addressList.length >= 3 && currentEditedAddress === null) {
      setFormData(intialAddressFormData);
      toast({
        title: "Maximum limit of addresses reached",
        variant: "destructive",
        className: "bg-red-500 text-white",
      });
      return;
    }
    currentEditedAddress !== null
      ? dispatch(
          editaAddress({
            userId: user?.id,
            addressId: currentEditedAddress,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setCurrentEditedAddress(null);
            setFormData(intialAddressFormData);
            toast({
              title: "Address updated successfully",
              className: "bg-purple-900 text-white",
            });
          }
        })
      : dispatch(addNewAddress({ ...formData, userId: user?.id })).then(
          (data) => {
            console.log(data);
            if (data?.payload?.success) {
              dispatch(fetchAllAddresses(user?.id));
              setFormData(intialAddressFormData);
              toast({
                title: "Address Added successfully",
                className: "bg-purple-900 text-white",
              });
            }
          }
        );
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  function handleDeleteAddress(getCurrentAddressId) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddressId._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast({
          title: "Address deleted successfully",
          className: "bg-red-500 text-white",
        });
      } else {
        console.log("Failed to delete address");
      }
    });
  }

  function handleEditAddress(getCurrentAddress) {
    setCurrentEditedAddress(getCurrentAddress._id);
    setFormData({
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      country: getCurrentAddress?.country,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    });
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  console.log(addressList, "addressList");

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                key={singleAddressItem.id}
                addressInfo={singleAddressItem}
                handleDeleteAddress={handleDeleteAddress}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedAddress !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedAddress !== null ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
