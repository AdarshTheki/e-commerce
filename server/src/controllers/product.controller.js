import { isValidObjectId } from "mongoose";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
    uploadSingleImg,
    uploadMultiImg,
    removeSingleImg,
    removeMultiImg,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getSingleProduct = asyncHandler(async (req, res, next) => {
    try {
        const { productId } = req.params;

        if (!isValidObjectId(productId)) {
            throw new ApiError(401, "product ID is invalid");
        }

        const product = await Product.findOne({ _id: productId })
            .populate("category", "-products")
            .populate("subCategory", "-products")
            .populate("brand")
            .populate("superCategory")
            .exec();

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    product,
                    "get single product by productId successfully"
                )
            );
    } catch (error) {
        next(error);
    }
});

const getAllProducts = asyncHandler(async (req, res, next) => {
    try {
        const {
            categoryId = "",
            brandId = "",
            subCategoryId = "",
            superCategoryId = "",
            page = 1,
            limit = 10,
        } = req.query;

        let q = {};
        categoryId && (q.category = categoryId);
        subCategoryId && (q.subCategory = subCategoryId);
        superCategoryId && (q.superCategory = superCategoryId);
        brandId && (q.brand = brandId);

        const products = await Product.find(q)
            .populate("lowest_variants")
            .select("-specification -overview")
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    products,
                    "get all products with query successfully"
                )
            );
    } catch (error) {
        next(error);
    }
});

const addProduct = asyncHandler(async (req, res, next) => {
    const { thumbnail, images } = req.files;
    const {
        title,
        description,
        category,
        brand,
        price,
        discount,
        rating,
        stock,
    } = req.body;
    const userId = req?.user._id;
    try {
        if (!thumbnail[0] || images.length === 0) {
            throw new ApiError(401, "add product files not upload properly");
        }

        if (!userId) {
            throw new ApiError(404, "product user is not authenticated");
        }

        if (
            !title ||
            !description ||
            !category ||
            !brand ||
            !price ||
            !discount ||
            !rating ||
            !stock
        ) {
            throw new ApiError(401, "product fill data properly");
        }

        const thumbnailPath = await uploadSingleImg(thumbnail[0].path);
        const imagesPath = await uploadMultiImg(images);

        if (!thumbnailPath && !imagesPath.length === 0) {
            throw new ApiError(401, "product files not upload on cloudinary");
        }

        const product = await Product.create({
            title,
            description,
            category,
            brand,
            price,
            discount,
            rating,
            stock,
            owner: userId,
            thumbnail: thumbnailPath,
            images: imagesPath,
        });

        if (!product) {
            throw new ApiError(401, "create product failed");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, {}, "created new product successfully"));
    } catch (error) {
        next(error);
    }
});

const updateProduct = asyncHandler(async (req, res, next) => {
    const { productId } = req.params;
    const { title, description, category, price } = req.body;
    const { thumbnail, images } = req.files;
    try {
        if (!isValidObjectId(productId)) {
            throw new ApiError(401, "Invalid product ID");
        }

        const product = await Product.findOne({ _id: productId });

        if (!product) {
            throw new ApiError(401, "this product not found on database");
        }

        if (thumbnail[0]?.path) {
            const thumbnailPath = await uploadSingleImg(thumbnail[0]?.path);
            product.thumbnail = thumbnailPath;
        }

        if (images.length > 0) {
            const imagesPath = await uploadMultiImg(images);
            product.images = imagesPath;
        }

        if (title) {
            product.title = title;
        }

        if (description) {
            product.description = description;
        }
        if (category) {
            product.category = category;
        }
        if (price) {
            product.price = price;
        }

        if (!product) {
            throw new ApiError(401, "update product failed");
        }

        await product.save();

        return res
            .status(200)
            .json(new ApiResponse(200, {}, "product updated successfully"));
    } catch (error) {
        next(error);
    }
});

const deleteProduct = asyncHandler(async (req, res, next) => {
    const { productId } = req.params;
    try {
        if (!isValidObjectId(productId)) {
            throw new ApiError(401, "Invalid product ID");
        }

        const deleted = await Product.findOneAndDelete({
            _id: productId,
        });

        if (!deleted) {
            throw new ApiError(404, "product not found on database");
        }

        await removeSingleImg(deleted?.thumbnail);
        await removeMultiImg(deleted?.images);

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {},
                    "product deleted successfully also with thumbnail & images"
                )
            );
    } catch (error) {
        next(error);
    }
});

export {
    addProduct,
    getSingleProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
};
