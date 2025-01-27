import { Router } from "express";
import {
  createVariant,
  deleteVariant,
  getAllVariants,
  getSingleVariant,
  updateVariant,
} from "../controllers/variant.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/")
  .get(getAllVariants)
  .post(upload.fields([{ name: "images", maxCount: 4 }]), createVariant);

router
  .route("/:variantId")
  .get(getSingleVariant)
  .patch(upload.fields([{ name: "images", maxCount: 4 }]), updateVariant)
  .delete(deleteVariant);

export default router;
