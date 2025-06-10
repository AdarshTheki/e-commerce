import React, { useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import { socialFormats } from "../helper/constant";
import { LazyImage, Loading } from "../utils";
import { Download } from "lucide-react";

const GalleryImage = () => {
  const [query, setQuery] = useState({
    expression: "folder:gallery",
    limit: 10,
  });
  const { data: images, loading } = useFetch(
    `/gallery?expression=${query.expression}&limit=${query.limit}`
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
        <h2 className="text-xl font-medium">Gallery</h2>
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
        <label htmlFor="expression">
          <select
            className="peer border cursor-pointer border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 py-1.5"
            id="expression"
            onChange={(e) => setQuery({ ...query, expression: e.target.value })}
            value={query.expression}>
            <option value={"folder:gallery"}>Gallery</option>
            <option value={"folder:cartify"}>Cartify</option>
            <option value={"folder:cartify-demo"}>Cartify Demo</option>
            <option value={"resource_type:image"}>All Image</option>
          </select>
        </label>
      </div>

      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5">
        {images &&
          images?.map((url, index) => {
            const path = url.split("/upload").length
              ? url
                  .split("/upload")
                  .join(
                    `/upload/w_${socialFormats[selectedFormat].width},h_${socialFormats[selectedFormat].height},ar_${socialFormats[selectedFormat].aspectRatio},c_fill`
                  )
              : url;
            return (
              <Card
                key={index}
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

const Card = ({ url, index, onDownload }) => {
  const imageRef = useRef(null);
  return (
    <div key={index} className="w-full relative">
      <LazyImage
        placeholder="/placeholder.jpg"
        src={url}
        alt={`file_${index}`}
        ref={imageRef}
      />
      <button
        className="btn btn-primary absolute top-1 left-1"
        onClick={() => onDownload(imageRef)}>
        <Download />
      </button>
    </div>
  );
};
