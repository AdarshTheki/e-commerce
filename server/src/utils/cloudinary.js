import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { logger } from "../middlewares/logger.middleware.js";

// Configs
cloudinary.config({
  cloud_name: "dlf3lb48n",
  api_key: "996239776893621",
  api_secret: "i_PNYOejURBRtp8Rx3DKRoSCd5Q",
});

const defaultFolder = "cartify";

// Upload Single Image
const uploadSingleImg = async (localFilePath = "", folder = "") => {
  if (!localFilePath) return false;

  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: folder || defaultFolder,
    });

    fs.unlinkSync(localFilePath); // Clean temp file
    return result.secure_url;
  } catch (error) {
    logger.error("Upload Error:", error.message);
    return false;
  }
};

// Upload Multiple Images
const uploadMultiImg = async (images = [], folder = "") => {
  if (!Array.isArray(images) || images.length === 0) return [];

  try {
    const uploadResults = await Promise.allSettled(
      images.map((file) =>
        cloudinary.uploader.upload(file.path, {
          folder: folder || defaultFolder,
        })
      )
    );

    const urls = uploadResults
      .filter((res) => res.status === "fulfilled")
      .map((res) => res.value.secure_url);

    images.forEach((img) => fs.unlinkSync(img.path)); // Clean all temp files

    return urls;
  } catch (error) {
    logger.error("Upload Error:", error.message);
    return [];
  }
};

// Delete Single Image
const removeSingleImg = async (url = "") => {
  if (!url) return false;

  try {
    const publicId = extractPublicId(url);
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "ok" || result.result === "not found") return true;

    logger.error(result.result);
    return false;
  } catch (error) {
    logger.error("Delete Error:", error.message);
    return false;
  }
};

// Delete Multiple Images
const removeMultiImg = async (imageUrls = []) => {
  if (!Array.isArray(imageUrls) || imageUrls.length === 0) return false;

  try {
    const publicIds = imageUrls.map((url) => extractPublicId(url));

    const results = await Promise.allSettled(
      publicIds.map((id) => cloudinary.uploader.destroy(id))
    );

    const hasFailures = results.some(
      (r) => r.status === "rejected" || r.value?.result !== "ok"
    );

    return !hasFailures;
  } catch (error) {
    logger.error(error.message);
    return false;
  }
};

// Extract Cloudinary Public ID from URL
const extractPublicId = (url = "") => {
  // Expected format: https://res.cloudinary.com/xxx/image/upload/v12345678/folder/filename.jpg
  const parts = url.split("/");
  const filename = parts.pop()?.split(".")[0];
  const folder =
    parts.slice(-1)[0] === defaultFolder
      ? defaultFolder
      : parts.slice(-2).join("/");

  return `${folder}/${filename}`;
};

export {
  cloudinary,
  uploadSingleImg,
  uploadMultiImg,
  removeSingleImg,
  removeMultiImg,
  extractPublicId,
};
