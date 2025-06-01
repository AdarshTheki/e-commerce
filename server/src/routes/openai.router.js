import express from "express";
import twilio from "twilio";
import { openai, haggingFace } from "../utils/api.js";
import { AI } from "../models/ai.model.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { success } from "../utils/ApiResponse.js";

const router = express.Router();

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

    await AI.create({
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

    await AI.create({
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

    res.status(200).json(success(response.data));
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

export default router;
