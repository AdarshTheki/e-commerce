import { Router } from "express";

const router = Router();

// ----Check API is working properly----
router.get("/", async (req, res) => {
  res.status(200).json({ message: "API Health Check Successful" });
});

export default router;
