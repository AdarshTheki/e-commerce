import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./ApiError.js";

const cloud_name = "dlf3lb48n";
const api_key = "996239776893621";
const api_secret = "i_PNYOejURBRtp8Rx3DKRoSCd5Q";
const folder = "cartify-demo";

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

const uploadMultiImg = async (images = [], folderName = "") => {
  if (images.length === 0) return [];
  try {
    const uploadResults = await Promise.allSettled(
      images.map((file) =>
        cloudinary.uploader.upload(file.path, {
          folder: folderName || folder,
        })
      )
    );

    const urls = uploadResults
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value.secure_url);

    images.forEach((img) => fs.unlinkSync(img.path));

    return urls;
  } catch (error) {
    console.error("Error uploading images:", error.message);
    return [];
  }
};

const uploadSingleImg = async (localFilePath = "") => {
  try {
    if (!localFilePath) return false;

    const res = await cloudinary.uploader.upload(localFilePath, {
      folder,
    });

    fs.unlinkSync(localFilePath);

    return res.secure_url;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

const removeSingleImg = async (url = "") => {
  if (!url) {
    throw new ApiError(400, "Image URL is required for deletion.");
  }
  try {
    const publicId = url.split("/").pop().split(".")[0];
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== "ok") {
      throw new ApiError(
        500,
        `Failed to delete image from Cloudinary: ${result.result}`
      );
    }
    return true;
  } catch (error) {
    console.error("Error deleting single image:", error.message);
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Failed to delete image from Cloudinary."
    );
  }
};

const removeMultiImg = async (images = []) => {
  if (images.length === 0) {
    throw new ApiError(400, "Image URLs are required for deletion.");
  }
  try {
    const publicIds = images.map((url) => /^(cartify(-demo)?\/.+)$/.test(url));
    const deletionResults = await Promise.allSettled(
      publicIds.map((publicId) => cloudinary.uploader.destroy(publicId))
    );

    // const failedDeletions = deletionResults.filter(
    //   (result) => result.status === "rejected" || result.value.result !== "ok"
    // );

    // if (failedDeletions.length > 0) {
    //   const errors = failedDeletions.map(
    //     (result) =>
    //       result.reason?.message || result.value?.result || "Unknown error"
    //   );
    //   throw new ApiError(
    //     500,
    //     `Failed to delete some images from Cloudinary: ${errors.join(", ")}`
    //   );
    // }
    return true;
  } catch (error) {
    console.error("Error deleting multiple images:", error.message);
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Failed to delete images from Cloudinary."
    );
  }
};

const getImageUrls = async (expression = "folder:gallery", limit = 100) => {
  try {
    const result = await cloudinary.search
      .expression(expression)
      .sort_by("created_at", "desc")
      .max_results(parseInt(limit)) // You can paginate if you have more than 100
      .execute();
    const urls = result.resources.map((file) => file.secure_url);
    return urls;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

export {
  cloudinary,
  uploadSingleImg,
  removeSingleImg,
  uploadMultiImg,
  removeMultiImg,
  getImageUrls,
};
