import { useState } from "react";
import { Input, LazyImage } from "../utils";
import errorHandler from "../helper/errorHandler";
import axiosInstance from "../helper/axiosInstance";
import { Trash2Icon } from "lucide-react";
import { GalleryImage, ImageCropper } from "../components";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleRemoveImage = (id) => {
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[id]);
      return prev.filter((_, index) => index !== id);
    });
    setImages((prev) => prev.filter((_, index) => index !== id));
  };

  async function handleSubmit() {
    try {
      if (!images?.length) return null;
      const formData = new FormData();
      images.forEach((file) => formData.append("gallery", file));
      const res = await axiosInstance.post("/gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res?.data?.length) {
        setPreviews(res.data);
        setImages([]);
      }
    } catch (error) {
      errorHandler(error);
    }
  }

  return (
    <div className="max-w-6xl mx-auto min-h-screen p-3">
      <div className="flex gap-x-5 gap-y-2 flex-wrap items-end">
        <label htmlFor="gallery" className="flex flex-col gap-2">
          <span className="font-medium">Upload Gallery Image</span>
          <Input
            id="gallery"
            type="file"
            accept="image/*"
            multiple
            className="!w-fit !cursor-pointer"
            onChange={handleImageChange}
          />
        </label>

        {previews?.length > 0 && (
          <button
            onClick={handleSubmit}
            className="btn !bg-green-600 !text-white">
            Upload Images of {images?.length}
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-5 gap-2 mt-5">
        {previews.length > 0 &&
          previews.map((file, index) => (
            <DisplayImage
              key={index}
              index={index}
              file={file}
              onRemove={handleRemoveImage}
            />
          ))}
      </div>

      <ImageCropper />

      <GalleryImage />
    </div>
  );
};

export default Gallery;

const DisplayImage = ({ index, file, onRemove }) => {
  return (
    <div key={index} className="w-full relative">
      <LazyImage
        placeholder="/placeholder.jpg"
        src={file}
        alt={`file_${index}`}
        className="w-full h-full"
      />

      <button
        className="btn btn-secondary absolute top-1 right-1"
        onClick={() => onRemove(index)}
        type="button">
        <Trash2Icon />
      </button>
    </div>
  );
};
