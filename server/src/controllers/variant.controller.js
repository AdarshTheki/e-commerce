import { Variant } from "../models/variant.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { removeMultiImg, uploadMultiImg } from "../utils/cloudinary.js";

export const getAllVariants = asyncHandler(async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    let p = Number(page || 1),
      l = Number(limit || 10);

    const variants = await Variant.find()
      .select("status size color quantity")
      .limit(l * 1)
      .skip((p - 1) * l)
      .sort({ status: "asc" });

    res
      .status(200)
      .json(new ApiResponse(200, variants, "get all variants success"));
  } catch (error) {
    next(error);
  }
});

export const getSingleVariant = asyncHandler(async (req, res, next) => {
  try {
    const variant = await Variant.findById(req?.params?.variantId);
    if (!variant) throw new ApiError(401, "this variant not exits on db");
    res
      .status(200)
      .json(new ApiResponse(200, variant, "get single variant by variantId"));
  } catch (error) {
    next(error);
  }
});

export const createVariant = asyncHandler(async (req, res, next) => {
  const { images } = req.files;
  const { original_price, discount_price, quantity, size, color, status } =
    req.body;
  try {
    if (
      !images.length ||
      !original_price ||
      !discount_price ||
      !quantity ||
      !size ||
      !color ||
      !status
    ) {
      throw new ApiError(
        401,
        "please fill original_price, discount_price, quantity, size, color, status & images file"
      );
    }

    const newImgs = await uploadMultiImg(images);
    if (!newImgs?.length) throw new ApiError(401, "variant images not created");

    const variant = await Variant.create({
      images: newImgs,
      original_price,
      discount_price,
      quantity,
      size,
      color,
      status,
    });

    if (!variant) throw new ApiError(401, "variant not created");

    res
      .status(200)
      .json(new ApiResponse(200, {}, "created new variant success"));
  } catch (error) {
    next(error);
  }
});

export const updateVariant = asyncHandler(async (req, res, next) => {
  const { images } = req.files;
  const { original_price, discount_price, quantity, size, color, status } =
    req.body;
  try {
    const variant = await Variant.findById(req?.params?.variantId);

    if (!!original_price) variant.original_price = original_price;
    if (!!discount_price) variant.discount_price = discount_price;
    if (!!quantity) variant.quantity = quantity;
    if (!!size) variant.size = size;
    if (!!color) variant.color = color;
    if (!!status) variant.status = status;

    if (images?.length) {
      const newImgs = await uploadMultiImg(images);
      if (newImgs?.length) variant.images = newImgs;
    }

    await variant.save();

    res.status(200).json(new ApiResponse(200, {}, "update variant success"));
  } catch (error) {
    next(error);
  }
});

export const deleteVariant = asyncHandler(async (req, res, next) => {
  const { variantId } = req.params;
  try {
    const variant = await Variant.findByIdAndDelete(variantId);
    if (!variant) throw new ApiError(401, "variant not exits on db");

    if (variant?.images?.length) {
      await removeMultiImg(variant?.images);
    }

    res.status(200).json(new ApiResponse(200, {}, "variant deleted success"));
  } catch (error) {
    next(error);
  }
});
