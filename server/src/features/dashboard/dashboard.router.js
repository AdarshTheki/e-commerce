import { Router } from "express";
import { getTotals, getTopProducts } from "./dashboard.controller.js";

const router = Router();

router.get("/totals", getTotals);
router.get("/top-products", getTopProducts);

export default router;
