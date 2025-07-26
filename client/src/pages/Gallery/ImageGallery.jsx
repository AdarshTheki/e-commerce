import { useState } from "react";
import useApi from "../../hooks/useApi";
import { socialFormats } from "../../helper";
import { Loading, Select } from "../../utils";

import { useEffect } from "react";
import GalleryCard from "./GalleryCard";
import { ArrowDownAZ, ArrowDownZA, ArrowUpZA } from "lucide-react";

const sorts = [
  "created_at",
  "public_id",
  "updated_at",
  "uploaded_at",
  "bytes",
  "width",
  "height",
  "format",
  "resource_type",
  "type",
  "context",
  "tags",
  "filename",
  "access_mode",
];

const GalleryImage = () => {
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [expression, setExpression] = useState("resource_type:image");
  const [selectedFormat, setSelectedFormat] = useState(
    "Instagram Square (1:1)"
  );
  const { data, loading, callApi, setData } = useApi();

  useEffect(() => {
    callApi(
      `/cloudinary?expression=${expression}&sort=${sort}&order=${order}&limit=${limit}`,
      {},
      "get"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, sort, order, expression]);

  return (
    <div>
      <h2 className="text-xl font-medium">All Images</h2>
      <div className="py-5 flex">
        <Select
          list={["resource_type:image", "resource_type:video"]}
          onSelected={setExpression}
          selected={expression}
          label={"Asset Resource Types"}
        />
        <Select
          label={"Folder Names"}
          list={["folder:cartify", "folder:cartify-demo", "folder:gallery"]}
          onSelected={setExpression}
          selected={expression}
        />
        <Select
          label={"Advanced Sorts"}
          list={sorts}
          onSelected={setSort}
          selected={sort}
        />
        <Select
          label={"Social Formate Sizes"}
          list={Object.keys(socialFormats)}
          onSelected={setSelectedFormat}
          selected={selectedFormat}
        />
        <Select
          label={"Pages"}
          list={[10, 20, 30]}
          selected={limit}
          onSelected={setLimit}
        />
        <button
          onClick={() => setOrder((p) => (p === "asc" ? "desc" : "asc"))}
          className="px-4 border rounded bg-white text-gray-800 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none">
          {order === "asc" ? (
            <ArrowDownAZ strokeWidth={1} size={20} />
          ) : (
            <ArrowUpZA strokeWidth={1} size={20} />
          )}
        </button>
      </div>

      {!!loading && <Loading />}

      <div className="sm:gap-4 gap-2 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5">
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
