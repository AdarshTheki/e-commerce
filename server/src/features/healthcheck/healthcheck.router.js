import { Router } from "express";
import { healthCheck } from "./healthcheck.controller.js";

const router = Router();

// ----Check API is working properly----
router.get("/api/v1", healthCheck);

export default router;
