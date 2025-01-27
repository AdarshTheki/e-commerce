import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  getSingleProduct,
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = Router();

// all of brand, category and search by products with query
router.route("/").get(getAllProducts);
router.route("/:productId").delete(deleteProduct);

router.route("/:productId").get(getSingleProduct);

router.route("/").post(
  verifyJWT,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 4 },
  ]),
  addProduct
);

router.route("/:productId").patch(
  verifyJWT,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 4 },
  ]),
  updateProduct
);

export default router;
