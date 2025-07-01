import { Router } from "express";
import { Address } from "../models/address.model.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// get all address by user
router.get("/", verifyJWT(), async (req, res) => {
  try {
    const addresses = await Address.find({
      createdBy: req.user._id,
    });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// address create by user
router.post("/", verifyJWT(), async (req, res) => {
  try {
    const { addressLine, isDefault, city, postalCode, countryCode } = req.body;
    const createdBy = req.user._id;

    if (!addressLine || !city || !postalCode || !countryCode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (
      typeof parseInt(postalCode) !== "number" ||
      postalCode < 100000 ||
      postalCode > 999999
    ) {
      return res.status(400).json({ message: "Invalid postal code" });
    }

    const newAddress = new Address({
      createdBy,
      addressLine,
      isDefault: isDefault || false,
      city,
      postalCode: parseInt(postalCode),
      countryCode,
    });

    await newAddress.save();

    if (isDefault) {
      await Address.updateMany(
        { createdBy, _id: { $ne: newAddress._id } },
        { $set: { isDefault: false } }
      );
    }

    res.status(201).json({
      shipping: newAddress,
      message: "shipping address created success",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// address updated by user
router.patch("/:id", verifyJWT(), async (req, res) => {
  try {
    const addressId = req.params.id;
    const { addressLine, isDefault, city, postalCode, countryCode } = req.body;

    const address = await Address.findOne({
      _id: addressId,
      createdBy: req.user._id,
    });
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    address.addressLine = addressLine || address.addressLine;
    address.city = city || address.city;
    address.postalCode = postalCode || address.postalCode;
    address.countryCode = countryCode || address.countryCode;

    if (isDefault !== undefined) {
      address.isDefault = isDefault;
      if (isDefault) {
        await Address.updateMany(
          { createdBy: req.user._id, _id: { $ne: address._id } },
          { $set: { isDefault: false } }
        );
      }
    }

    await address.save();

    res.status(202).json({
      shipping: address,
      message: "address updated success",
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

router.delete("/:id", verifyJWT(), async (req, res) => {
  try {
    const addressId = req.params.id;

    const address = await Address.findOneAndDelete(
      { _id: addressId },
      { createdBy: req.user._id }
    );

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res
      .status(200)
      .json({ shipping: address, message: "address delete succeed" }); // 204 No Content (successful deletion)
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

export default router;
