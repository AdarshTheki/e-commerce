import { Router } from "express";
import {
    signUp,
    signIn,
    getRefreshToken,
    getMe,
    logout,
    updateUser,
    updateWishlist,
    updateUserAvatar,
    removeUserAvatar,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/sign-up").post(signUp);
router.route("/refresh").post(getRefreshToken);
router.route("/sign-in").post(signIn);

router.use(verifyJWT);

router.route("/me").get(getMe);
router.route("/update").patch(updateUser);

router
    .route("/avatar")
    .patch(upload.single("avatar"), updateUserAvatar)
    .delete(removeUserAvatar);

router.route("/logout").get(logout);
router.route("/wishlist/:productId").post(updateWishlist);

export default router;
