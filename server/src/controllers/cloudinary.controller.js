import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { cloudinary, extractPublicId } from '../utils/cloudinary.js';
import { AIModel } from '../models/ai.model.js';
import fs from 'fs';

// @desc    Apply Cloudinary image effect
// @route   POST /api/v1/openai/image-effect
// @access  Private
export const imageEffect = asyncHandler(async (req, res) => {
  const { transformations } = req.body;
  const imagePath = req.file?.path;

  if (!imagePath) {
    throw new ApiError(400, 'Image file is required');
  }

  if (!transformations) {
    throw new ApiError(400, 'Transformations are required');
  }

  // 1. Upload the image to Cloudinary
  const uploadResult = await cloudinary.uploader.upload(imagePath);
  const publicId = uploadResult.public_id;

  fs.unlinkSync(imagePath);

  // 2. Parse the transformations
  const transformationList = JSON.parse(transformations);

  if (!Array.isArray(transformationList)) {
    throw new ApiError(400, 'Transformations should be an array');
  }

  // 3. Generate transformed image URLs
  const transformedImages = transformationList.map((transformation) => {
    const transformedUrl = cloudinary.url(publicId, {
      transformation: [transformation], // Apply a single transformation
    });

    // Extract transformation name for the response
    const transformationName = Object.entries(transformation)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');

    return {
      secure_url: transformedUrl,
      transformation: transformationName,
    };
  });

  const newAiModel = await AIModel({
    createdBy: req.user._id,
    prompt: transformedImages.map((i) => i.transformation)[0],
    response: transformedImages.map((i) => i.secure_url)[0],
    isPublic: true,
    model: 'text-to-image',
  });

  // 4. Respond with the array of transformed images
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        newAiModel,
        'Image transformations applied successfully'
      )
    );
});

// @desc    Remove background from an image
// @route   POST /api/v1/cloudinary/remove-background
// @access  Private
export const removeBackground = asyncHandler(async (req, res) => {
  const imagePath = req.file?.path;
  if (!imagePath) {
    throw new ApiError(400, 'Image file is required');
  }

  const result = await cloudinary.uploader.upload(imagePath, {
    effect: 'background_removal',
  });

  fs.unlinkSync(imagePath);

  const newAiModel = await AIModel({
    createdBy: req.user._id,
    prompt: 'remove background image',
    response: result.secure_url,
    isPublic: true,
    model: 'text-to-image',
  });

  res
    .status(200)
    .json(new ApiResponse(200, newAiModel, 'Background removed successfully'));
});

// @desc    Remove object from an image
// @route   POST /api/v1/cloudinary/remove-object
// @access  Private
export const removeObject = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  const imagePath = req.file?.path;

  if (!imagePath) {
    throw new ApiError(400, 'Image file is required');
  }
  if (!prompt) {
    throw new ApiError(400, 'Prompt is required to describe the object');
  }

  const result = await cloudinary.uploader.upload(imagePath, {
    transformation: { effect: `gen_remove:${new URLSearchParams(prompt)}` },
  });

  fs.unlinkSync(imagePath);

  const newAiModel = await AIModel({
    createdBy: req.user._id,
    prompt: prompt,
    response: result.secure_url,
    isPublic: true,
    model: 'text-to-image',
  });

  res
    .status(200)
    .json(new ApiResponse(200, newAiModel, 'Object removed successfully'));
});

export const getAllImages = asyncHandler(async (req, res) => {
  const expression = req.query?.expression || 'resource_type:image';
  const order = req.query?.order || 'desc';
  const sort = req.query?.sort || 'created_at';
  const limit = +req.query?.limit || 10;

  let searchQuery = cloudinary.search
    .expression(expression)
    .sort_by(sort, order)
    .max_results(limit);

  const result = await searchQuery.execute();

  const data = result.resources;

  res
    .status(200)
    .json(new ApiResponse(200, data, 'Cloudinary data retrieve successfully'));
});

export const removeCloudinaryFile = asyncHandler(async (req, res) => {
  const { imageUrl } = req.body;
  if (!imageUrl) {
    throw new ApiError(400, 'ImageUrl is required!');
  }

  const publicId = extractPublicId(imageUrl);

  const result = await cloudinary.uploader.destroy(publicId);

  res.status(200).json(new ApiResponse(200, result, 'Delete Image Success'));
});

export const uploadCloudinaryFile = asyncHandler(async (req, res) => {
  const { folder } = req.body; // optional folder name
  const imagePath = req?.file?.path;

  if (!imagePath) throw new ApiError(404, 'Image filepath is Invalid');

  const result = await cloudinary.uploader.upload(imagePath, {
    folder: folder || 'cartify',
  });

  fs.unlinkSync(imagePath);

  res.status(200).json(new ApiResponse(200, result, 'Upload Image Success'));
});
