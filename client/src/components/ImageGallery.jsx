import React, { useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import { socialFormats } from "../helper";
import { LazyImage, Loading } from "../utils";
import { Download, Trash2Icon } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { errorHandler, axios } from "../helper";

const GalleryImage = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
  });
  const { data, loading } = useFetch(
    `/gallery/all?page=${query.page}&limit=${query.limit}`
  );
  const [selectedFormat, setSelectedFormat] = useState(
    "Instagram Square (1:1)"
  );

  const handleDownload = (imageRef) => {
    if (!imageRef.current) return;
    // download image on current page
    fetch(imageRef.current.src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${selectedFormat.replace(/\s+/g, "_").toLowerCase()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      });
  };

  if (loading) return <Loading />;

  return (
    <div>
      <div className="flex gap-x-5 gap-y-2 py-5 items-center flex-wrap">
        <h2 className="text-xl font-medium">All Images</h2>
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
        <label htmlFor="page-item">
          <select
            className="peer border cursor-pointer border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 py-1.5"
            id="page-item"
            onChange={(e) => setQuery({ ...query, limit: e.target.value })}
            value={query.limit}>
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
            <option value={30}>30 / page</option>
            <option value={50}>50 / page</option>
            <option value={100}>100 / page</option>
          </select>
        </label>
      </div>

      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5">
        {data?.totalItems &&
          data.items?.map((img, index) => {
            const path = img.image_url.split("/upload").length
              ? img.image_url
                  .split("/upload")
                  .join(
                    `/upload/w_${socialFormats[selectedFormat].width},h_${socialFormats[selectedFormat].height},ar_${socialFormats[selectedFormat].aspectRatio},c_fill`
                  )
              : img.image_url;
            return (
              <Card
                key={index}
                item={img}
                url={path}
                index={index}
                onDownload={handleDownload}
              />
            );
          })}
      </div>
    </div>
  );
};

export default GalleryImage;

const Card = ({ url, index, onDownload, item }) => {
  const imageRef = useRef(null);
  const user = useSelector((state) => state.auth?.user);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/gallery/single/${item._id}`);
      if (res.data) {
        toast.success("Image delete succeed");
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div key={index} className="w-full relative border border-gray-300">
      <LazyImage
        placeholder="/placeholder.jpg"
        src={url}
        alt={`file_${index}`}
        ref={imageRef}
      />
      <button
        className="btn btn-primary !p-1 absolute top-1 left-1"
        onClick={() => onDownload(imageRef)}>
        <Download />
      </button>
      {user && user?.role == "admin" && (
        <button
          className="btn btn-secondary !p-1 absolute top-1 right-1"
          onClick={handleDelete}>
          <Trash2Icon />
        </button>
      )}
    </div>
  );
};
