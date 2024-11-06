import Address from "../../models/Address.js";

//add address
export const addAddress = async (req, res) => {
  try {
    const { userId, address, city, country, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !country || !pincode || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid data provided!" });
    }

    const newlyCreatedAddress = new Address({
      userId,
      address,
      city,
      country,
      pincode,
      phone,
      notes,
    });

    await newlyCreatedAddress.save();
    res.status(200).json({ success: true, data: newlyCreatedAddress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

//update address

export const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    const formData = req.body;

    if (!addressId || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid address and User Id" });
    }

    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true }
    );

    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }
    res.status(200).json({ success: true, data: address });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

//delete address

export const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if (!addressId || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid address and User Id" });
    }

    const deletedAddress = await Address.findOneAndDelete({
      _id: addressId,
      userId,
    });

    if (!deletedAddress) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Address deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

//fetch all addresses

export const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid userId" });
    }

    const allAddresses = await Address.find({ userId });

    res.status(200).json({ success: true, data: allAddresses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};
