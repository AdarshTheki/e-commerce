import express from "express";
import OpenAI from "openai";
import twilio from "twilio";

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.openai_api_key,
});

const client = twilio(process.env.accountSid, process.env.authToken);

router.post("/description-ai", async (req, res) => {
  try {
    const { title, category, brand, size } = req.body;

    if (!title || !category || !brand) {
      return res.status(404).json({
        message: "title, category and brand are required",
        status: false,
      });
    }

    const result = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
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

    res.status(200).json({ result, status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

router.post("/prompt", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages.length) {
      return res.status(404).json({
        message: "messages with role and content are required",
        status: false,
      });
    }

    const result = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    res.status(200).json({ result, status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

router.post("/image", async (req, res) => {
  try {
    const image = await openai.images.generate({
      prompt: "A cute baby sea otter",
    });

    res.status(200).json({
      message: "Image generated successfully",
      url: image.data[0].url,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

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

export default router;
