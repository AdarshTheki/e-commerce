import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";
import {
  changePassword,
  createUser,
  deleteUser,
  getAllUsers,
  getCurrentUser,
  getFavorites,
  getUserById,
  googleAuth,
  logout,
  refreshToken,
  removeAvatar,
  signIn,
  signUp,
  toggleFavorite,
  updateAvatar,
  updateUser,
  updateUserProfile,
} from "./user.controller.js";

const router = Router();

// Unauthenticated routes
router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/refresh-token", refreshToken);
router.post("/google", googleAuth);

// Authenticated routes
router.use(verifyJWT());

router.get("/current-user", getCurrentUser);
router.post("/logout", logout);
router.post("/password", changePassword);
router.patch("/update", updateUserProfile);

router
  .route("/avatar")
  .post(upload.single("avatar"), updateAvatar)
  .delete(removeAvatar);

router.route("/favorite").get(getFavorites);
router.route("/favorite/:id").patch(toggleFavorite);

// Admin routes

router.use(verifyJWT(["admin", "seller"]));

router.route("/admin").get(getAllUsers).post(createUser);

router
  .route("/admin/:id")
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

export default router;
