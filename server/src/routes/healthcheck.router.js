import { Router } from "express";

const router = Router();

// ----Check API is working properly----
router.get("/api/v1/health-check", async (req, res) => {
  res.status(200).json({ message: "API Health Check Successful" });
});

// ---Check API is Valid Endpoints----
router.get("/api/v1", (req, res) => {
  res.status(504).json({ message: "API Endpoint is Not Found" });
});

// ---Display the HTML Static Page Load---
router.get("/", (req, res) => {
  return res.sendFile("/public/dist/index.html");
});

export default router;
