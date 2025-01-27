import { Category } from "../models/category.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { removeSingleImg, uploadSingleImg } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { isValidObjectId } from "mongoose";

const getAllCategories = asyncHandler(async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    let p = Number(page || 1),
      l = Number(limit || 10);

    const categories = await Category.find()
      .select("status title thumbnail")
      .limit(l * 1)
      .skip((p - 1) * l)
      .sort({ createdAt: -1 });

    res
      .status(200)
      .json(
        new ApiResponse(200, categories, "get all categories successfully")
      );
  } catch (error) {
    next(error);
  }
});

const getSingleCategory = asyncHandler(async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);

    if (!category) throw new ApiError(401, "this category not found on db");

    res
      .status(200)
      .json(new ApiResponse(200, category, "get single category successfully"));
  } catch (error) {
    next(error);
  }
});

const createCategory = asyncHandler(async (req, res, next) => {
  const thumbnail = req.file;
  const { title, status } = req.body;
  try {
    if (!title || !status || !thumbnail)
      throw new ApiError(401, "fill data ares title, status & thumbnail file");

    const thumbnailPath = await uploadSingleImg(thumbnail.path);

    if (!thumbnailPath) {
      throw new ApiError(401, "files not upload properly on cloudinary");
    }

    const category = await Category.create({
      title,
      status,
      thumbnail: thumbnailPath,
    });

    if (!category) {
      throw new ApiError(401, "create new category failed");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "create new category successfully"));
  } catch (error) {
    next(error);
  }
});

// params: categoryId
const updateCategory = asyncHandler(async (req, res, next) => {
  const thumbnail = req.file;
  const { title, status } = req.body;
  const { categoryId } = req.params;
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new ApiError(401, "this category not found on database");
    }

    if (thumbnail?.path) {
      const thumbnailPath = await uploadSingleImg(thumbnail.path);
      if (thumbnailPath) {
        await removeSingleImg(category.thumbnail);
        category.thumbnail = thumbnailPath;
      }
    }

    if (title) category.title = title;
    if (status) category.status = status;

    if (!category) {
      throw new ApiError(401, "category update failed on db");
    }

    await category.save();

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "update category successfully"));
  } catch (error) {
    next(error);
  }
});

const deleteCategory = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    const deleted = await Category.findByIdAndDelete(categoryId);

    if (!deleted) {
      throw new ApiError(404, "category not deleted on database");
    }

    await removeSingleImg(deleted.thumbnail);

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "category deleted successfully"));
  } catch (error) {
    next(error);
  }
});

const updateCategoryByProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.query;
  const { categoryId } = req.params;
  try {
    if (!isValidObjectId(productId) || !isValidObjectId(categoryId))
      throw new ApiError(401, "invalid productId & categoryId");

    const category = await Category.findOneAndUpdate(
      { _id: categoryId },
      {
        $pull: { products: productId },
        $addToSet: { products: productId },
      },
      { new: true }
    );

    if (!category)
      throw new ApiError(401, "update category products pull & push failed");

    res
      .status(200)
      .json(new ApiResponse(200, {}, "update category by product ids"));
  } catch (error) {
    next(error);
  }
});

export {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  updateCategoryByProduct,
};
