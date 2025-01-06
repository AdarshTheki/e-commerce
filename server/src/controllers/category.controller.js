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
            .limit(l * 1)
            .skip((p - 1) * l);

        res.status(200).json(
            new ApiResponse(200, categories, "get all categories successfully")
        );
    } catch (error) {
        next(error);
    }
});

const getSingleCategory = asyncHandler(async (req, res, next) => {
    try {
        const { categoryId } = req.params;

        if (!isValidObjectId(categoryId)) {
            throw new ApiError(401, "this category ID is not valid");
        }

        const category = await Category.findOne({ _id: categoryId });
        if (!category) {
            throw new ApiError(401, "this category not found on database");
        }

        res.status(200).json(
            new ApiResponse(200, category, "get single category successfully")
        );
    } catch (error) {
        next(error);
    }
});

const createCategory = asyncHandler(async (req, res, next) => {
    const thumbnail = req.file;
    const { name, description } = req.body;
    try {
        if (!thumbnail) throw new ApiError(401, "files not upload properly");

        if (!name || !description)
            throw new ApiError(401, "not define the name and description");

        const thumbnailPath = await uploadSingleImg(thumbnail.path);

        if (!thumbnailPath) {
            throw new ApiError(401, "files not upload properly on cloudinary");
        }

        const category = await Category.create({
            name,
            description,
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
    console.log(thumbnail);
    const { name, description } = req.body;
    try {
        const { categoryId } = req.params;

        if (!isValidObjectId(categoryId)) {
            throw new ApiError(401, "this category ID is not valid");
        }

        const category = await Category.findOne({ _id: categoryId });
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

        if (name) {
            category.name = name;
        }

        if (description) {
            category.description = description;
        }

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
    try {
        const { categoryId } = req.params;
        if (!isValidObjectId(categoryId)) {
            throw new ApiError(401, "this category ID is not valid");
        }

        const deleted = await Category.findOneAndDelete({
            _id: categoryId,
        });

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

export {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
    getSingleCategory,
};
