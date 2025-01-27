import { Router } from "express";
import {
    createBrand,
    deleteBrand,
    updateBrand,
    getAllBrands,
    getSingleBrand,
} from "../controllers/brand.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
    .route("/")
    .get(getAllBrands)
    .post(upload.single("thumbnail"), createBrand);

router
    .route("/:brandId")
    .get(getSingleBrand)
    .patch(upload.single("thumbnail"), updateBrand)
    .delete(deleteBrand);

export default router;
