import express from "express";
import twilio from "twilio";
import { openai, haggingFace } from "../utils/api.js";
import { AI as AIModal } from "../models/ai.model.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { success } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import OpenAI from "openai";
import { cloudinary } from "../utils/cloudinary.js";
import FormData from "form-data";
import axios from "axios";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// create instance of openai
const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

const generateArticle = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { prompt, length, word } = req.body;

  const response = await AI.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
      {
        role: "user",
        content: `Write a article about this "${prompt}" in ${word}"`,
      },
    ],
    temperature: 0.7,
    max_tokens: length,
  });

  const newAIModal = await AIModal.create({
    createdBy: userId,
    model: "generate-article",
    response: response.choices[0].message.content,
    publish: false,
    prompt,
  });

  res
    .status(201)
    .json({ result: newAIModal, message: "generate articles successfully" });
});

const generateBlogTitle = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { prompt, category } = req.body;

  const response = await AI.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
      {
        role: "user",
        content: `Generate a Blog title about this "${prompt}" in the category ${category}.`,
      },
    ],
    temperature: 0.7,
    max_tokens: 100,
  });

  const newAIModal = await AIModal.create({
    createdBy: userId,
    model: "generate-blog-title",
    response: response.choices[0].message.content,
    publish: false,
    prompt,
  });

  res
    .status(201)
    .json({ result: newAIModal, message: "generate blog title successfully" });
});

const generateTextToImage = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { prompt, publish } = req.body;

  if (!prompt)
    throw new ApiError(404, "Please enter a prompt of generate text to image");

  const formData = new FormData();

  formData.append("prompt", prompt);

  const response = await axios.post(
    "https://clipdrop-api.co/text-to-image/v1",
    formData,
    {
      headers: {
        "x-api-key": process.env.CLIPDROP_API_KEY,
      },
      responseType: "arraybuffer",
    }
  );

  const base64Image = `data:image/png;base64,${Buffer.from(response.data, "binary").toString("base64")}`;

  const { secure_url } = await cloudinary.uploader.upload(base64Image);

  if (!secure_url)
    throw new ApiError(404, "generate text to image upload failed");

  const newAIModal = await AIModal.create({
    createdBy: userId,
    model: "generate-text-to-image",
    response: secure_url,
    publish: !!publish,
    prompt,
  });

  res.status(201).json({
    result: newAIModal,
    message: "generate text to image successfully",
  });
});

const backgroundRemovalImage = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const image = req?.file?.path;

  if (!image) throw new ApiError(404, "image file path is Invalid");

  const { public_id } = await cloudinary.uploader.upload(image);

  const imageUrl = cloudinary.url(public_id, {
    transformation: [{ effect: "background_removal" }],
    resource_type: "image",
  });

  const newAIModal = await AIModal.create({
    createdBy: userId,
    model: "background-removal",
    response: imageUrl,
    prompt: "background-removal",
  });

  res.status(201).json({
    result: newAIModal,
    message: "background removal image successfully",
  });
});

const objectRemovalImage = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const image = req?.file?.path;
  const object = req?.body?.prompt;

  if (!image || !object)
    throw new ApiError(404, "prompt & image file path is Invalid");

  const { public_id } = await cloudinary.uploader.upload(image);

  const imageUrl = cloudinary.url(public_id, {
    transformation: [
      { effect: `gen_remove:${object?.split(" ").join("%20") || object}` },
    ],
    resource_type: "image",
  });

  const newAIModal = await AIModal.create({
    createdBy: userId,
    model: "object-removal",
    response: imageUrl,
    prompt: object,
  });

  res.status(201).json({
    result: newAIModal,
    message: "object removal image successfully",
  });
});

router.post("/review-ai", verifyJWT(), async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(404).json({
        message: "title, category and brand are required",
        status: false,
      });
    }

    const payload = `Generate a e-commerce product review under 200 characters for this prompt "${prompt}"`;

    const response = await openai.post("/chat/completions", {
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: payload,
        },
      ],
    });

    await AIModal.create({
      createdBy: req.user._id,
      response: response.data.choices[0].message.content,
      prompt,
    });

    res
      .status(200)
      .json(
        success(response.data.choices[0].message.content, "create ai review")
      );
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

router.post("/description-ai", verifyJWT(), async (req, res) => {
  try {
    const { title, category, brand, size } = req.body;

    if (!title || !category || !brand) {
      return res.status(404).json({
        message: "title, category and brand are required",
        status: false,
      });
    }

    const prompt = `Generate a e-commerce product description under ${size ? parseInt(size) : 500} characters for a ${category} product with the title "${title}" and the brand "${brand}"`;

    const response = await openai.post("/chat/completions", {
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content:
            "The description should highlight the key features, benefits, and unique selling points of the product. Use a tone that aligns with the brand's identity and appeals to the target audience of the category. Include relevant keywords for SEO optimization and end with a subtle call to action (e.g., 'Shop now,' 'Discover more,' etc.). Keep the description clear, professional, and easy to understand.",
        },
      ],
    });

    await AIModal.create({
      createdBy: req.user._id,
      response: response.data.choices[0].message.content,
      prompt,
    });

    res.status(200).json({
      message: "Description generated with OpenAI",
      result: response.data.choices[0].message.content,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// This endpoint generates an image based on the prompt provided in the request body
router.post("/image-ai", async (req, res) => {
  try {
    const { prompt, size = "512x512" } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const response = await openai.post("/images/generations", {
      prompt,
      size,
      n: 1,
    });

    res
      .status(200)
      .json(success(response.data, "image generate success with openai"));
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// prompt for chat gpt
router.post("/prompt", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await openai.post("/chat/completions", {
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
    });

    res.status(201).json({
      message: "Prompt generated with OpenAI",
      result: response.data.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

const client = twilio(process.env.accountSid, process.env.authToken);

// twilio sms
router.post("/sms", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const result = await client.messages.create({
      body: message,
      messagingServiceSid: process.env.messagingSid,
      to: "+917719971779",
    });

    res.status(200).json({ message: "Message sent successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

router.post("/hugging-ai", async (req, res) => {
  try {
    const {
      prompt = "a cute dog with eating a food with owner gives with phone",
    } = req.body;
    const response = await haggingFace.post("/images/generations", {
      prompt,
    });

    res.status(201).json({ image: response.data });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

router.post("/generate-article", verifyJWT(), generateArticle);
router.post("/generate-blog-title", verifyJWT(), generateBlogTitle);
router.post("/generate-text-to-image", verifyJWT(), generateTextToImage);
router.post(
  "/object-removal",
  verifyJWT(),
  upload.single("image"),
  objectRemovalImage
);
router.post(
  "/background-removal",
  verifyJWT(),
  upload.single("image"),
  backgroundRemovalImage
);

export default router;
