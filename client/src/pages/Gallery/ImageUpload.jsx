import { useState } from "react";
import { Input, LazyImage } from "../../utils";
import { Sheet, Trash2Icon } from "lucide-react";
import { socialFormats } from "../../helper";
import useApi from "../../hooks/useApi";
import GalleryCard from "./GalleryCard";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(
    "Instagram Square (1:1)"
  );
  const { callApi, loading, data, setData } = useApi();

  const handleImageChange = (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    const result = await callApi("/cloudinary", formData);
    if (result) {
      setData(result);
      setImage(null);
      setPreview(null);
    }
  }

  return (
    <div className="min-h-[40vh] max-w-4xl mx-auto grid gap-5 sm:grid-cols-2">
      <form className="space-y-4">
        <label className="flex flex-col gap-2">
          <span className="font-medium">Upload Image</span>
          <Input
            id="fileInput"
            type="file"
            accept="image/*"
            placeholder="upload"
            className="!w-[228px] !cursor-pointer"
            onChange={handleImageChange}
          />
        </label>

        {!preview && (
          <label
            htmlFor="fileInput"
            className="border bg-white rounded-md text-sm w-80 border-indigo-600/60 p-8 flex flex-col items-center gap-4  cursor-pointer hover:border-indigo-500 transition">
            <Sheet />
            <p className="text-gray-500">Drag & drop your files here</p>
            <p className="text-gray-400">
              Or <span className="text-indigo-500 underline">click</span> to
              upload
            </p>
            <input id="fileInput" type="file" className="hidden" />
          </label>
        )}

        {!!preview && (
          <div className="w-full relative">
            <LazyImage
              placeholder="/placeholder.jpg"
              src={preview}
              alt={`file_preview`}
              className="w-full h-full"
            />
            <button
              className="btn !p-1 btn-secondary absolute top-1 right-1"
              onClick={() => {
                setImage(null);
                setPreview(null);
              }}
              type="button">
              <Trash2Icon />
            </button>
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="btn !bg-green-600 !text-white">
          {loading ? "loading..." : `Upload Images`}
        </button>
      </form>

      <div className="flex flex-col gap-2">
        {!!data?.secure_url && (
          <label htmlFor="selection">
            <p className="pb-2 font-medium">Social Size:</p>
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

        {!!data?.secure_url && (
          <GalleryCard
            item={data}
            secure_url={
              data?.secure_url?.split("/upload").length
                ? data?.secure_url
                    .split("/upload")
                    .join(
                      `/upload/w_${socialFormats[selectedFormat].width},h_${socialFormats[selectedFormat].height},ar_${socialFormats[selectedFormat].aspectRatio},c_fill`
                    )
                : data?.secure_url
            }
          />
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
