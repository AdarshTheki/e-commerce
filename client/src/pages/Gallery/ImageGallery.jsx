import { useState } from "react";
import useApi from "../../hooks/useApi";
import { socialFormats } from "../../helper";
import { Loading } from "../../utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/Select";
import { useEffect } from "react";
import GalleryCard from "./GalleryCard";

const GalleryImage = () => {
  const [limit, setLimit] = useState(10);
  const [selectedFormat, setSelectedFormat] = useState(
    "Instagram Square (1:1)"
  );
  const { data, loading, callApi, setData } = useApi();

  useEffect(() => {
    callApi(
      `/cloudinary?expression=resource_type:image&sort=created_at&order=desc&limit=${limit}`,
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
              {[10, 20, 30].map((item) => (
                <SelectItem
                  key={item}
                  value={item}>{`${item} / page`}</SelectItem>
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
              <GalleryCard
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
