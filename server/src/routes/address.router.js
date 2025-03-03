import { Router } from "express";
import { Address } from "../models/address.model.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isValidObjectId } from "mongoose";

const router = Router();

// get all address user
router.get("/", verifyJWT, async (req, res) => {
  try {
    const addresses = await Address.findOne({ owner: req.user._id }).populate(
      "owner",
      "username email"
    ); // Populate owner but exclude password
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// get single address by user
router.get("/:id", verifyJWT, async (req, res) => {
  try {
    const addressId = req.params.id;

    if (!isValidObjectId(addressId)) {
      return res.status(400).json({ message: "Invalid address ID" });
    }

    const address = await Address.findById(addressId);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    if (address.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// address create by user
router.post("/", verifyJWT, async (req, res) => {
  try {
    const { addressLine1, addressLine2, city, state, pinCode, country } =
      req.body;
    const owner = req.user._id; // Assuming you have authentication middleware that adds user info to req.user

    // Server-side validation (you can use a library like Joi for more complex validation)
    if (!addressLine1 || !city || !state || !pinCode || !country) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (typeof pinCode !== "number" || pinCode < 100000 || pinCode > 999999) {
      return res.status(400).json({ message: "Invalid PIN code" });
    }

    const newAddress = new Address({
      owner,
      addressLine1,
      addressLine2,
      city,
      state,
      pinCode,
      country,
    });

    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress); // 201 Created
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// address updated by user
router.patch("/:id", verifyJWT, async (req, res) => {
  try {
    const addressId = req.params.id;
    const { addressLine1, addressLine2, city, state, pinCode, country } =
      req.body;

    if (!isValidObjectId(addressId)) {
      return res.status(400).json({ message: "Invalid address ID" });
    }

    const address = await Address.findById(addressId);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    if (address.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Server-side validation (similar to createAddress)
    if (!addressLine1 || !city || !state || !pinCode || !country) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (typeof pinCode !== "number" || pinCode < 100000 || pinCode > 999999) {
      return res.status(400).json({ message: "Invalid PIN code" });
    }

    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      { addressLine1, addressLine2, city, state, pinCode, country },
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    res.status(202).json(updatedAddress);
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

router.delete("/:id", verifyJWT, async (req, res) => {
  try {
    const addressId = req.params.id;

    if (!isValidObjectId(addressId)) {
      return res.status(400).json({ message: "Invalid address ID" });
    }
    const address = await Address.findById(addressId);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    if (address.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await Address.findByIdAndDelete(addressId);
    res.status(204).json({ message: "address delete succeed" }); // 204 No Content (successful deletion)
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

export default router;
