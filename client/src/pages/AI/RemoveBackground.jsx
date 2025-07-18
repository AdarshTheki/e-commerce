import React, { useState } from "react";
import { AiToolsData } from "../../assets/assets";
import { Sparkles } from "lucide-react";
import useApi from "../../hooks/useApi";
import ImageTransformations from "./ImageTransformations";

const RemoveBackground = () => {
  const [input, setInput] = useState("");
  const [openImgUrl, setOpenImgUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { loading, data, callApi, setData } = useApi();
  const aiTool = AiToolsData[3];

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "imageUrl",
      "https://res.cloudinary.com/dlf3lb48n/image/upload/v1752826654/zqkv9ferx8jdha5jcrjm.png"
    );
    formData.append(
      "transformation",
      JSON.stringify([
        { effect: "grayscale" },
        { effect: "blur:200" },
        { width: 500, crop: "scale" },
      ])
    );

    const result = await callApi("/image-effect", {
      imageUrl:
        "https://res.cloudinary.com/dlf3lb48n/image/upload/v1752826654/zqkv9ferx8jdha5jcrjm.png",
      transformation: [
        {
          effect: "grayscale",
        },
        {
          effect: "blur:200",
        },
        {
          width: 500,
          crop: "scale",
        },
      ],
    });
    console.log(result);
    if (result) {
      setData(result);
      setInput("");
    }
  };

  return (
    <div className="gap-4 p-4 grid sm:grid-cols-2">
      {/* Left Create Form */}
      <form className="card !px-5 flex-1 space-y-5" onSubmit={handleSubmitForm}>
        <div className="flex gap-2 items-center">
          <Sparkles className={`w-6 h-6`} style={{ color: aiTool.bg.from }} />
          <p className="font-medium">{aiTool.title}</p>
        </div>
        <div>
          <label htmlFor="ai-bg-remover" className="font-medium text-sm">
            Upload image
          </label>
          <input
            accept="image/*"
            name="ai-bg-remover"
            id="ai-bg-remover"
            type="file"
            onChange={(e) => setInput(e.target.files[0])}
            className="w-full text-sm p-2 px-5 rounded-lg border outline-none"
            style={{ borderColor: aiTool.bg.from }}
          />
          <small>Supports JPG, PNG, and other image formats</small>
        </div>

        <button
          style={{
            background: `linear-gradient(to bottom, ${aiTool.bg.from}, ${aiTool.bg.to})`,
          }}
          className="py-2 mt-8 hover:opacity-85 flex text-white rounded-full items-center justify-center gap-2 !text-sm w-full">
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full border-t-2 border-blue-1 border-solid h-5 w-5"></div>
            </div>
          ) : (
            <aiTool.Icon className="w-4 h-4" />
          )}
          {aiTool.title}
        </button>
      </form>

      {/* Right Generate Content */}
      <div className="card !px-5 flex-1">
        <div className="flex gap-2 items-center">
          <aiTool.Icon
            className="lucide lucide-square-pen w-7 h-7 p-1 text-white rounded-xl"
            style={{
              background: `linear-gradient(to bottom, ${aiTool.bg.from}, ${aiTool.bg.to}`,
            }}
          />
          <p className="font-medium">{aiTool.title}</p>
        </div>
        <div className="min-h-[300px] h-full text-center flex items-center justify-center flex-col">
          {data ? (
            <img src={data} alt="Generated" className="rounded-lg shadow-md" />
          ) : (
            <>
              <aiTool.Icon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <small className="text-gray-400">
                Enter a topic and click “{aiTool.title}” to get started
              </small>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageTransformations;
