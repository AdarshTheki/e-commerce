import { Gallery } from "../models/gallery.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  getImageUrls,
  removeSingleImg,
  uploadMultiImg,
} from "../utils/cloudinary.js";

// @desc    Upload images to gallery
// @route   POST /api/v1/gallery
// @access  Admin
export const uploadImages = asyncHandler(async (req, res) => {
  const { gallery } = req.files;
  if (!gallery?.length) {
    throw new ApiError(400, "No images uploaded");
  }

  const images = await uploadMultiImg(gallery, "gallery");
  if (!images?.length) {
    throw new ApiError(500, "Image upload failed");
  }

  const data = images.map((url) => ({
    createdBy: req.user._id,
    image_url: url,
  }));

  const galleries = await Gallery.insertMany(data);

  return res
    .status(201)
    .json(new ApiResponse(201, galleries, "Images uploaded successfully"));
});

// @desc    Delete an image from gallery
// @route   DELETE /api/v1/gallery/:imageId
// @access  Admin
export const deleteImage = asyncHandler(async (req, res) => {
  const { imageId } = req.params;

  const gallery = await Gallery.findByIdAndDelete(imageId);
  if (!gallery) {
    throw new ApiError(404, "Image not found");
  }

  await removeSingleImg(gallery.image_url);

  return res
    .status(200)
    .json(new ApiResponse(200, gallery, "Image deleted successfully"));
});

// @desc    Get all images from gallery
// @route   GET /api/v1/gallery
// @access  Public
export const getAllImages = asyncHandler(async (req, res) => {
  const { limit = 50, page = 1 } = req.query;
  const options = {
    page,
    limit,
    sort: { createdAt: -1 },
  };

  const gallery = await Gallery.paginate({}, options);

  return res
    .status(200)
    .json(new ApiResponse(200, gallery, "Images retrieved successfully"));
});

// @desc    Get all images from Cloudinary
// @route   GET /api/v1/gallery/cloudinary
// @access  Admin
export const getCloudinaryImages = asyncHandler(async (req, res) => {
  const { expression = "folder:gallery", limit = 100 } = req.query;
  const urls = await getImageUrls(expression, limit);
  return res
    .status(200)
    .json(
      new ApiResponse(200, urls, "Cloudinary images retrieved successfully")
    );
});
