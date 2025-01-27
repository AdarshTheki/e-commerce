import { isValidObjectId } from "mongoose";
import { Brand } from "../models/brand.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { removeSingleImg, uploadSingleImg } from "../utils/cloudinary.js";

const getAllBrands = asyncHandler(async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    let p = Number(page || 1),
      l = Number(limit || 10);

    const brands = await Brand.find()
      .limit(l * 1)
      .skip((p - 1) * l)
      .sort({ sequence: 1 });
    res
      .status(200)
      .json(new ApiResponse(200, brands, "get all brands successfully"));
  } catch (error) {
    next(error);
  }
});

const getSingleBrand = asyncHandler(async (req, res, next) => {
  try {
    const { brandId } = req.params;

    if (!isValidObjectId(brandId)) {
      throw new ApiError(401, "this brand ID is not valid");
    }

    const brand = await Brand.findOne({ _id: brandId });
    if (!brand) {
      throw new ApiError(401, "this brand not found on database");
    }

    res
      .status(200)
      .json(new ApiResponse(200, brand, "get single brand successfully"));
  } catch (error) {
    next(error);
  }
});

const createBrand = asyncHandler(async (req, res, next) => {
  const thumbnail = req.file;
  const { title, status, top_brand, sequence } = req.body;
  try {
    if (!thumbnail) throw new ApiError(401, "files not upload properly");

    if (!title || !status || !top_brand || !sequence)
      throw new ApiError(
        401,
        "please fill title, status, top_brand & sequence"
      );

    const thumbnailPath = await uploadSingleImg(thumbnail.path);

    if (!thumbnailPath) {
      throw new ApiError(401, "files not upload properly on cloudinary");
    }

    await Brand.create({
      title,
      status,
      top_brand,
      sequence,
      thumbnail: thumbnailPath,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "created new brand successfully"));
  } catch (error) {
    next(error);
  }
});

const updateBrand = asyncHandler(async (req, res, next) => {
  const thumbnail = req.file;
  const { title, status, top_brand, sequence } = req.body;
  const { brandId } = req.params;
  try {
    if (!isValidObjectId(brandId)) {
      throw new ApiError(401, "this brand ID is not valid");
    }
    const brand = await Brand.findById(brandId);

    if (thumbnail?.path) {
      const thumbnailPath = await uploadSingleImg(thumbnail?.path);
      if (thumbnailPath) {
        await removeSingleImg(brand.thumbnail);
        brand.thumbnail = thumbnailPath;
      }
    }

    if (!!title) brand.title = title;
    if (!!top_brand) brand.top_brand = top_brand;
    if (!!sequence) brand.sequence = sequence;
    if (!!status) brand.status = status;

    await brand.save();

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "updated brand success"));
  } catch (error) {
    next(error);
  }
});

const deleteBrand = asyncHandler(async (req, res, next) => {
  try {
    const { brandId } = req.params;
    if (!isValidObjectId(brandId)) {
      throw new ApiError(401, "brand ID is invalid");
    }
    const brand = await Brand.findByIdAndDelete(brandId);

    if (!brand) {
      throw new ApiError(401, "brand not deleted on db");
    }
    await removeSingleImg(brand.thumbnail);

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "brand deleted successfully"));
  } catch (error) {
    next(error);
  }
});

export { createBrand, updateBrand, deleteBrand, getAllBrands, getSingleBrand };
