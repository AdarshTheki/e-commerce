import express from "express";
import twilio from "twilio";
import { openaiInstance, haggingaiInstance } from "../utils/api.js";

const router = express.Router();

router.post("/description-ai", async (req, res) => {
  try {
    const { title, category, brand, size } = req.body;

    if (!title || !category || !brand) {
      return res.status(404).json({
        message: "title, category and brand are required",
        status: false,
      });
    }

    const response = await openaiInstance.post("/chat/completions", {
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `Generate a e-commerce product description under ${size ? parseInt(size) : 500} characters for a ${category} product with the title "${title}" and the brand "${brand}"`,
        },
        {
          role: "user",
          content:
            "The description should highlight the key features, benefits, and unique selling points of the product. Use a tone that aligns with the brand's identity and appeals to the target audience of the category. Include relevant keywords for SEO optimization and end with a subtle call to action (e.g., 'Shop now,' 'Discover more,' etc.). Keep the description clear, professional, and easy to understand.",
        },
      ],
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

    const response = await openaiInstance.post("/images/generations", {
      prompt,
      size,
      n: 1,
    });

    res.status(201).json({
      message: "Image generated with OpenAI",
      image: response.data.data[0].url,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// prompt for chat gpt
router.post("/prompt", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await openaiInstance.post("/chat/completions", {
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
    const response = await haggingaiInstance.post("/images/generations", {
      prompt,
    });

    res.status(201).json({ image: response.data });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

export default router;
