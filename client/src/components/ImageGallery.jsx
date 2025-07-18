import React, { useRef, useState } from "react";
import useApi from "../hooks/useApi";
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
import { useEffect } from "react";

const GalleryImage = () => {
  const [limit, setLimit] = useState(10);
  const [selectedFormat, setSelectedFormat] = useState(
    "Instagram Square (1:1)"
  );
  const { data, loading, callApi, setData } = useApi();

  useEffect(() => {
    callApi(
      `/cloudinary/search?expression=resource_type:image&sort=created_at&order=desc&limit=${limit}`,
      {},
      "get"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

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
          <Select onValueChange={(value) => setLimit(value)}>
            <SelectTrigger>
              <SelectValue placeholder={`${limit} / page`} />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300 ">
              {[10, 20, 30, 50, 100].map((item) => (
                <SelectItem value={item}>{`${item} / page`}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5">
        {data?.length > 0 &&
          data?.map((img, index) => {
            const path = img?.secure_url?.split("/upload").length
              ? img.secure_url
                  .split("/upload")
                  .join(
                    `/upload/w_${socialFormats[selectedFormat].width},h_${socialFormats[selectedFormat].height},ar_${socialFormats[selectedFormat].aspectRatio},c_fill`
                  )
              : img.secure_url;

            return (
              <Card
                key={index}
                {...img}
                secure_url={path}
                onDelete={() =>
                  setData((prev) =>
                    prev.filter((i) => i.public_id !== img.public_id)
                  )
                }
              />
            );
          })}
      </div>
    </div>
  );
};

export default GalleryImage;

const Card = ({
  public_id,
  created_at,
  uploaded_at,
  resource_type,
  secure_url,
  onDelete,
}) => {
  const imageRef = useRef(null);
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
      const res = await axios.post(`/cloudinary/delete`, {
        publicId: public_id,
      });
      if (res.data) {
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
          className="btn btn-secondary !p-1 absolute top-1 right-1"
          onClick={handleDelete}>
          <Trash2Icon />
        </button>
      )}
    </div>
  );
};
