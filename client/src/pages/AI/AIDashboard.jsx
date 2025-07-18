import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import useApi from "../../hooks/useApi";
import { Loading } from "../../utils";
import Markdown from "react-markdown";
import { format } from "date-fns";
import { classNames } from "../../helper";

const AIDashboard = () => {
  const [selectedArticle, setSelectedArticle] = useState("");
  const { callApi, data, loading } = useApi();

  useEffect(() => {
    callApi("/openai/generate-text", {}, "get");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="mx-auto container p-4 space-y-5">
      <div className="card flex items-center w-64 !px-6">
        <div className="text-lg font-medium space-y-2 w-full">
          <p>Total Creations</p>
          <p>{data?.length}</p>
        </div>
        <div className="p-2 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center">
          <Sparkles className="w-6 h-6" />
        </div>
      </div>

      {/* Recent Creations */}
      <p>Recent Creations</p>

      <div className="flex flex-wrap gap-5">
        {data &&
          data?.map((create) => (
            <div className="card sm:!flex-1/3 w-full" key={create._id}>
              <div
                onClick={() =>
                  setSelectedArticle((prev) =>
                    prev === create._id ? "" : create._id
                  )
                }
                className="w-full flex justify-between gap-2 items-center cursor-pointer">
                <div className="flex flex-col gap-1">
                  <p
                    className={classNames(
                      selectedArticle === create?._id ? "" : "line-clamp-1",
                      "font-medium"
                    )}>
                    {create.prompt}
                  </p>
                  <small>
                    AI model :{" "}
                    <span className="status-active !py-1">#{create.model}</span>
                  </small>
                  <small className="text-gray-500">
                    {format(new Date(create?.createdAt), "dd MMM yyyy, h:mm a")}
                  </small>
                  <small className="text-gray-500">
                    User: {create?.createdBy?.email}
                  </small>
                </div>
                {create._id === selectedArticle ? (
                  <ChevronUp className="min-w-6 min-h-6" />
                ) : (
                  <ChevronDown className="min-w-6 min-h-6" />
                )}
              </div>
              {create._id === selectedArticle &&
                create?.model !== "text-to-image" && (
                  <div className="p-2 overflow-y-auto max-h-[50dvh] w-full text-sm">
                    <div className="reset-tw">
                      <Markdown>{create.response}</Markdown>
                    </div>
                  </div>
                )}

              {create._id === selectedArticle &&
                create?.model === "text-to-image" && (
                  <img
                    src={create.response}
                    alt="model_Pic"
                    className="w-full"
                  />
                )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AIDashboard;
