import { Router } from "express";

const router = Router();

// ----Check API is working properly----
router.get("/api/v1", async (req, res) => {
  res.status(200).json({ message: "API Health Check Successful" });
});

// ---Check API is Valid Endpoints
router.get("*", (req, res) => {
  res.status(504).json({ message: "API Endpoint is Not Found" });
});

export default router;
