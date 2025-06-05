import { Router } from "express";
import { success, error } from "../utils/ApiResponse.js";

const router = Router();

router.get("/api/v1", async (req, res) => {
  res.status(200).json(success(null, "API Health Check Successful"));
});

// router.get("*", (req, res) => {
//   res.status(404).json(error("Endpoint Not Found", 404));
// });

export default router;
