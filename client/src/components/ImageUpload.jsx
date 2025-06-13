import React, { useState } from "react";
import { Input, LazyImage } from "../utils";
import { Download, Trash2Icon } from "lucide-react";
import { errorHandler, axios } from "../helper";
import { socialFormats } from "../helper";
import { useRef } from "react";

const ImageUpload = () => {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploaded, setUploaded] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState(
    "Instagram Square (1:1)"
  );

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const onRemove = (id) => {
    setPreviews(previews.filter((_, index) => index !== id));
    setImages(images.filter((_, index) => index !== id));
  };

  async function handleSubmit() {
    try {
      setLoading(true);
      if (!images?.length) return null;
      const formData = new FormData();
      images.forEach((file) => formData.append("gallery", file));
      const res = await axios.post("/gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res?.data) {
        setUploaded(res.data.galleries);
        setImages([]);
        setPreviews([]);
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[60vh]">
      <div className="flex gap-x-5 gap-y-2 flex-wrap items-end">
        <label htmlFor="gallery" className="flex flex-col gap-2">
          <span className="font-medium">Upload Image</span>
          <Input
            id="gallery"
            type="file"
            accept="image/*"
            multiple
            placeholder="upload"
            className="!w-[228px] !cursor-pointer"
            onChange={handleImageChange}
          />
        </label>

        {previews?.length > 0 && (
          <button
            onClick={handleSubmit}
            className="btn !bg-green-600 !text-white">
            {loading ? "loading..." : `Upload Images of ${images?.length}`}
          </button>
        )}

        {uploaded?.length > 0 && (
          <label htmlFor="selection">
            <select
              className="peer border cursor-pointer border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 py-1.5"
              id="selection"
              onChange={(e) => setSelectedFormat(e.target.value)}
              value={selectedFormat}>
              {Object.keys(socialFormats).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-5 gap-2 mt-5">
        {uploaded.length > 0 &&
          uploaded.map((item) => {
            const path = item.image_url.split("/upload").length
              ? item.image_url
                  .split("/upload")
                  .join(
                    `/upload/w_${socialFormats[selectedFormat].width},h_${socialFormats[selectedFormat].height},ar_${socialFormats[selectedFormat].aspectRatio},c_fill`
                  )
              : item.image_url;
            return <ImageUploadCard item={item} path={path} key={item._id} />;
          })}
        {previews.length > 0 &&
          previews.map((file, index) => (
            <div key={index} className="w-full relative">
              <LazyImage
                placeholder="/placeholder.jpg"
                src={file}
                alt={`file_${index}`}
                className="w-full h-full"
              />
              <button
                className="btn !p-1 btn-secondary absolute top-1 right-1"
                onClick={() => onRemove(index)}
                type="button">
                <Trash2Icon />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImageUpload;

const ImageUploadCard = ({ item, path }) => {
  const imgRef = useRef(null);

  const handleDownload = (imageRef) => {
    if (!imageRef.current) return;
    fetch(imageRef.current.src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        // Try to get the filename from the URL, fallback to a default name
        const filename =
          imageRef.current.src.split("/").pop()?.split("?")[0] || "image.png";
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });
  };

  return (
    <div key={item._id} className="w-full relative">
      <LazyImage
        placeholder="/placeholder.jpg"
        src={path}
        alt={`file_${item._id}`}
        className="w-full h-full"
        ref={imgRef}
      />
      <button
        className="btn !p-1 btn-secondary absolute top-1 right-1"
        onClick={() => handleDownload(imgRef)}
        type="button">
        <Download />
      </button>
    </div>
  );
};
