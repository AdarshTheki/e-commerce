import express from "express";
import OpenAI from "openai";

import { AIModel } from "../models/ai.model.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { cloudinary } from "../utils/cloudinary.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// review prompt
// `Generate a e-commerce product review under 200 characters for this prompt "${prompt}"`;

// description prompt
// `Generate a e-commerce product description under ${size ? parseInt(size) : 500} characters for a ${category} product with the title "${title}" and the brand "${brand}"`;

const generateText = asyncHandler(async (req, res) => {
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

const generateTextToImage = asyncHandler(async (req, res) => {
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

  // In a real application, you would likely upload this image to a cloud storage
  // like Cloudinary and then save the URL. For this example, we'll just return the URL.

  return res
    .status(200)
    .json(new ApiResponse(200, { imageUrl }, "Image generated successfully"));
});

const cloudinaryImageEffect = asyncHandler(async (req, res) => {
  const { imageUrl, effect } = req.body;
  const image = req?.file?.path;

  if (!(imageUrl || image) || !effect) {
    throw new ApiError(400, "Image URL and effect are required");
  }

  let url;
  if (image) {
    const { secure_url } = await cloudinary.uploader.upload(image);
    url = secure_url;
  }
  // gen_remove:
  // background_removal

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

const toggleLikesCreation = asyncHandler(async (req, res) => {
  const userId = req.user._id.toString();
  const aiPostId = req.params?.aiPostId;

  const checkLiked = await AIModel.findById(aiPostId);
  if (!checkLiked) throw new ApiError(404, "AI modal post not found");

  const isLiked = checkLiked.likes.map((i) => i.toString()).includes(userId);

  const updatedPost = await AIModel.findByIdAndUpdate(
    checkLiked._id,
    isLiked ? { $pull: { likes: userId } } : { $push: { likes: userId } },
    { new: true }
  );

  res.status(200).json({
    message: `User has ${isLiked ? "unliked" : "liked"} the post.`,
    totalLikes: updatedPost.likes.length,
  });
});

const getUserGenerate = asyncHandler(async (req, res) => {
  const posts = await AIModel.find({ createdBy: req.user._id }).sort({
    createdAt: -1,
  });
  res.status(200).json(posts);
});

// const generateTextToImage = asyncHandler(async (req, res) => {
//   const userId = req.user._id;
//   const { prompt, publish } = req.body;

//   if (!prompt)
//     throw new ApiError(404, "Please enter a prompt of generate text to image");

//   const formData = new FormData();

//   formData.append("prompt", prompt);

//   const response = await axios.post(
//     "https://clipdrop-api.co/text-to-image/v1",
//     formData,
//     {
//       headers: {
//         "x-api-key": process.env.CLIPDROP_API_KEY,
//       },
//       responseType: "arraybuffer",
//     }
//   );

//   const base64Image = `data:image/png;base64,${Buffer.from(response.data, "binary").toString("base64")}`;

//   const { secure_url } = await cloudinary.uploader.upload(base64Image);

//   if (!secure_url)
//     throw new ApiError(404, "generate text to image upload failed");

//   const newAIModal = await AIModel.create({
//     createdBy: userId,
//     model: "generate-text-to-image",
//     response: secure_url,
//     publish: !!publish,
//     prompt,
//   });

//   res.status(201).json({
//     result: newAIModal,
//     message: "generate text to image successfully",
//   });
// });

// const reviewResume = asyncHandler(async (req, res) => {
//   const resume = req?.file;

//   if (resume?.size > 5 * 1024 * 1024)
//     throw new ApiError(404, "file size upload under 5mb");

//   const dataBuffer = fs.readFileSync(resume.path);
//   const pdfData = await pdf(dataBuffer);

//   const prompt = `Review the following resume and provide a constructive feedback on its strengths, weaknesses and areas for improvement. Resume content:\n\ ${pdfData.text}`;

//    const response = await openai.chat.completions.create({
//      model: "gpt-3.5-turbo",
//      messages: [{ role: "user", content: prompt }],
//    });

//    const aiResponse = response.choices[0].message.content;

//    const newAIModel = await AIModel.create({
//      response: aiResponse,
//      createdBy: req.user._id,
//      model: "review-resume",
//      publish: true,
//      prompt: prompt.split("Resume content:")[0],
//    });

//    return res
//      .status(200)
//      .json(new ApiResponse(200, newAIModel, "Review resume generated successfully"));
// });

// router.post("/hugging-ai", async (req, res) => {
//   try {
//     const {
//       prompt = "a cute dog with eating a food with owner gives with phone",
//     } = req.body;
//     const response = await haggingFace.post("/images/generations", {
//       prompt,
//     });

//     res.status(201).json({ image: response.data });
//   } catch (error) {
//     res.status(500).json({ message: error.message, success: false });
//   }
// });

router.get("/generate-text", verifyJWT(), getUserGenerate);

router.post("/generate-text", verifyJWT(), generateText);

router.post("/generate-image", verifyJWT(), generateTextToImage);

router.post(
  "/image-effect",
  verifyJWT(),
  upload.single("image"),
  cloudinaryImageEffect
);

router.get("/like/:aiPostId", verifyJWT(), toggleLikesCreation);

export default router;
