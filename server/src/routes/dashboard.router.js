import { Router } from "express";
import { getTotals } from "../controllers/dashboard.controller.js";

const router = Router();

router.get("/totals", getTotals);

export default router;
