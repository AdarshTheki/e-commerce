import { Variant } from "../models/variant.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createVariant = asyncHandler(async (req, res, next) => {
    try {
        const { images, original_price, price, quantity } = req.body;

        // if (!images || !original_price || !price || !quantity) {
        //     throw new ApiError(401, "please fill all required");
        // }

        const variant = await Variant.create({
            images: [""],
            original_price: 0,
            price: 0,
            quantity: 0,
        });
        res.status(200).json(
            new ApiResponse(200, variant, "created new variant successfully")
        );
    } catch (error) {
        next(error);
    }
});

export const updateVariant = asyncHandler(async (req, res, next) => {
    try {
        const { variantId } = req.params;
        const { images, original_price, price, quantity } = req.body;
    } catch (error) {
        next(error);
    }
});
