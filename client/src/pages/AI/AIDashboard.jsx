import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Heart,
  Sparkles,
  Trash2Icon,
} from "lucide-react";
import useApi from "../../hooks/useApi";
import { Loading } from "../../utils";
import DashboardCard from "./DashboardCard";
import { axios, errorHandler } from "../../helper";

const AIDashboard = () => {
  const [selectedArticle, setSelectedArticle] = useState("");
  const { callApi, data, loading, setData } = useApi();

  useEffect(() => {
    callApi("/openai/generate-text", {}, "get");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeletePost = async (id) => {
    try {
      const res = await axios.delete(`/openai/post/${id}`);
      if (res.data) {
        setData((prev) => prev.filter((i) => i._id !== id));
      }
    } catch (error) {
      errorHandler(error);
    }
  };

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

      <div className="flex flex-col gap-5">
        {data &&
          data?.map((item) => (
            <DashboardCard
              key={item._id}
              isActive={item._id === selectedArticle}
              onActive={() =>
                setSelectedArticle((prev) =>
                  prev === item._id ? "" : item._id
                )
              }
              onDelete={() => handleDeletePost(item._id)}
              item={item}
            />
          ))}
      </div>
    </div>
  );
};

export default AIDashboard;
