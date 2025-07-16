import { Router } from "express";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createBrand,
  deleteBrand,
  getAllBrands,
  getBrandById,
  getBrandList,
  updateBrand,
} from "../controllers/brand.controller.js";

const router = Router();

router.route("/").get(getAllBrands).post(
  upload.single("thumbnail"),
  verifyJWT(["admin", "seller"]),
  createBrand
);
router.get("/list", getBrandList);
router
  .route("/:id")
  .get(getBrandById)
  .patch(verifyJWT(["admin", "seller"]), upload.single("thumbnail"), updateBrand)
  .delete(verifyJWT(["admin", "seller"]), deleteBrand);

export default router;
