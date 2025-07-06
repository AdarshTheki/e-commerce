import { Router } from "express";

const router = Router();

// ----Check API is working properly----
router.get("/api/v1", async (req, res) => {
  res.status(200).json({ message: "API Health Check Successful" });
});

export default router;
