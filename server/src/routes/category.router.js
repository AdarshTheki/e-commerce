import { Router } from "express";
import {
    createCategory,
    getAllCategories,
    getSingleCategory,
    deleteCategory,
    updateCategory,
} from "../controllers/category.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
    .route("/")
    .get(getAllCategories)
    .post(upload.single("thumbnail"), createCategory);

router
    .route("/:categoryId")
    .get(getSingleCategory)
    .patch(upload.single("thumbnail"), updateCategory)
    .delete(deleteCategory);

export default router;