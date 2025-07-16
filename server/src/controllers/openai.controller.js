import OpenAI from "openai";
import { AIModel } from "../models/ai.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { cloudinary } from "../utils/cloudinary.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// @desc    Generate text using OpenAI
// @route   POST /api/v1/openai/generate-text
// @access  Private
export const generateText = asyncHandler(async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    throw new ApiError(400, "Prompt is required");
  }

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  const aiResponse = response.choices[0].message.content;

  const newAIModel = await AIModel.create({
    response: aiResponse,
    prompt,
    createdBy: req.user._id,
    model: "generate-text",
    publish: true,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, newAIModel, "Text generated successfully"));
});

// @desc    Generate image from text using OpenAI
// @route   POST /api/v1/openai/generate-image
// @access  Private
export const generateTextToImage = asyncHandler(async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    throw new ApiError(400, "Prompt is required");
  }

  const image = await openai.images.generate({
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });

  const imageUrl = image.data[0].url;

  return res
    .status(200)
    .json(new ApiResponse(200, { imageUrl }, "Image generated successfully"));
});

// @desc    Apply Cloudinary image effect
// @route   POST /api/v1/openai/cloudinary-effect
// @access  Private
export const cloudinaryImageEffect = asyncHandler(async (req, res) => {
  const { imageUrl, effect } = req.body;
  const image = req?.file?.path;

  if (!(imageUrl || image) || !effect) {
    throw new ApiError(400, "Image URL or image file, and effect are required");
  }

  let url;
  if (image) {
    const { secure_url } = await cloudinary.uploader.upload(image);
    url = secure_url;
  }

  const transformedUrl = cloudinary.url(url || imageUrl, {
    effect: effect,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { transformedUrl },
        "Image effect applied successfully"
      )
    );
});

// @desc    Toggle like on an AI generated post
// @route   POST /api/v1/openai/toggle-like/:aiPostId
// @access  Private
export const toggleLikesCreation = asyncHandler(async (req, res) => {
  const userId = req.user._id.toString();
  const { slug } = req.params;

  const aiPost = await AIModel.findById(slug);
  if (!aiPost) {
    throw new ApiError(404, "AI post not found");
  }

  const isLiked = aiPost.likes.includes(userId);

  const updatedPost = await AIModel.findByIdAndUpdate(
    aiPost._id,
    isLiked ? { $pull: { likes: userId } } : { $push: { likes: userId } },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { totalLikes: updatedPost.likes.length },
        `User has ${isLiked ? "unliked" : "liked"} the post.`
      )
    );
});

// @desc    Get user's generated AI posts
// @route   GET /api/v1/openai/user-generations
// @access  Private
export const getUserGenerate = asyncHandler(async (req, res) => {
  const posts = await AIModel.find({ createdBy: req.user._id }).sort({
    createdAt: -1,
  });
  return res
    .status(200)
    .json(
      new ApiResponse(200, posts, "User generated posts retrieved successfully")
    );
});
