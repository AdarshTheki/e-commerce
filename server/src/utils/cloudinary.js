import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadMultiImg = async (images = []) => {
  try {
    if (images.length === 0) return [];
    const uploadResults = await Promise.allSettled(
      images.map((file) =>
        cloudinary.uploader.upload(file.path, {
          resource_type: "image",
          folder: process.env.CLOUDINARY_FOLDER || "cartify-demo",
        })
      )
    );

    const urls = uploadResults
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value.secure_url);

    images.forEach((img) => {
      try {
        fs.unlinkSync(img.path);
      } catch (err) {
        console.error("Error deleting file:", img.path, err.message);
      }
    });

    return urls;
  } catch (error) {
    console.error("Error uploading images:", error);
    return [];
  }
};

const uploadSingleImg = async (localFilePath = "") => {
  try {
    if (!localFilePath) return "";
    const res = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
      folder: process.env.CLOUDINARY_FOLDER || "cartify-demo",
    });
    try {
      fs.unlinkSync(localFilePath);
    } catch (err) {
      console.error("Error deleting file:", localFilePath, err.message);
    }
    return res.secure_url;
  } catch (error) {
    console.error("Error uploading single image:", error);
    return "";
  }
};

const removeSingleImg = async (url = "") => {
  try {
    if (!url) return false;
    const publicId = url.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
    return true;
  } catch (error) {
    console.error("Error removing single image:", error);
    return false;
  }
};

const removeMultiImg = async (images = []) => {
  try {
    if (images.length === 0) return false;
    const publicIds = images.map((url) => url.split("/").pop().split(".")[0]);
    await Promise.all(
      publicIds.map((publicId) =>
        cloudinary.uploader.destroy(publicId, { resource_type: "image" })
      )
    );
    return true;
  } catch (error) {
    console.error("Error removing multiple images:", error);
    return false;
  }
};

export { uploadSingleImg, removeSingleImg, uploadMultiImg, removeMultiImg };
