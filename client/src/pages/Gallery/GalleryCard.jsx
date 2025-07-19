import React, { useRef } from "react";
import { useSelector } from "react-redux";
import useApi from "../../hooks/useApi";
import { toast } from "react-toastify";
import { errorHandler } from "../../helper";
import { Download, Loader, Trash2Icon } from "lucide-react";
import { LazyImage } from "../../utils";

const GalleryCard = ({ secure_url, public_id, onDelete }) => {
  const imageRef = useRef(null);
  const { callApi, loading } = useApi();
  const user = useSelector((state) => state.auth?.user);

  const handleDownload = () => {
    if (!imageRef.current) return;
    // download image on current page
    fetch(imageRef.current.src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `download.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
  };

  const handleDelete = async () => {
    try {
      const result = await callApi(
        "/cloudinary",
        { imageUrl: secure_url },
        "delete"
      );
      if (result) {
        toast.success("Image delete succeed");
        onDelete();
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div title={public_id} className="w-full relative border border-gray-300">
      <LazyImage
        placeholder="/placeholder.jpg"
        src={secure_url}
        alt={`file_${public_id}`}
        ref={imageRef}
      />
      <button
        className="btn btn-primary !p-1 absolute top-1 left-1"
        onClick={handleDownload}>
        <Download />
      </button>
      {user && user?.role == "admin" && (
        <button
          disabled={loading}
          className="btn btn-secondary !p-1 absolute top-1 right-1"
          onClick={handleDelete}>
          {loading ? <Loader /> : <Trash2Icon />}
        </button>
      )}
    </div>
  );
};

export default GalleryCard;
