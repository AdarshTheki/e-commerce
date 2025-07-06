import React, { useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import { socialFormats } from "../helper";
import { LazyImage, Loading } from "../utils";
import { Download, Trash2Icon } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { errorHandler, axios } from "../helper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";

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
      });
  };

  if (loading) return <Loading />;

  return (
    <div>
      <div className="flex gap-x-5 gap-y-2 py-5 items-center flex-wrap">
        <h2 className="text-xl font-medium">All Images</h2>
        <div className="w-[200px]">
          <Select onValueChange={(value) => setSelectedFormat(value)}>
            <SelectTrigger>
              <SelectValue placeholder={selectedFormat} />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300 ">
              {Object.keys(socialFormats).map((item) => (
                <SelectItem value={item}>{item}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-[180px]">
          <Select
            onValueChange={(value) => setQuery({ ...query, limit: value })}>
            <SelectTrigger>
              <SelectValue placeholder={`${query.limit} / pages`} />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300 ">
              {[10, 20, 30, 50, 100].map((item) => (
                <SelectItem value={item}>{`${item} / pages`}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
