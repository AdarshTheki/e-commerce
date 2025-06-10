import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

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
          resource_type: "image",
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
      resource_type: "image",
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
  if (!url) return false;
  try {
    const publicId = url.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
    return true;
  } catch (error) {
    console.log(error.message);
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
    console.log(error.message);
    return false;
  }
};

const getImageUrls = async (expression = "folder:gallery", limit = 100) => {
  try {
    const result = await cloudinary.search
      .expression(expression)
      .sort_by("public_id", "desc")
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
  uploadSingleImg,
  removeSingleImg,
  uploadMultiImg,
  removeMultiImg,
  getImageUrls,
};
