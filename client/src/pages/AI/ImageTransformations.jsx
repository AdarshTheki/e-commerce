import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import useApi from "../../hooks/useApi";
import { toast } from "react-toastify";

const ImageTransformations = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [selectedTransformations, setSelectedTransformations] = useState([]);
  const { loading, data, callApi, setData } = useApi();

  const aiTool = {
    title: "AI Image Transformations",
    Icon: Sparkles,
    bg: { from: "#4ade80", to: "#3b82f6" },
  };

  const transformationOptions = [
    { name: "Grayscale", value: { effect: "grayscale" } },
    { name: "Oil Painting", value: { effect: "oil_paint" } },
    { name: "Cartoonify", value: { effect: "cartoonify" } },
    { name: "Blur (300)", value: { effect: "blur:300" } },
    { name: "Pixelate Faces", value: { effect: "pixelate_faces" } },
    { name: "Sepia", value: { effect: "sepia" } },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setData(null);
    }
  };

  const toggleTransformation = (transformationValue) => {
    setSelectedTransformations((prev) => {
      const isSelected = prev.some(
        (t) => JSON.stringify(t) === JSON.stringify(transformationValue)
      );
      if (isSelected) {
        return prev.filter(
          (t) => JSON.stringify(t) !== JSON.stringify(transformationValue)
        );
      } else {
        return [...prev, transformationValue];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      return toast.error("Please upload an image first.");
    }
    if (selectedTransformations.length === 0) {
      return toast.error("Please select at least one transformation.");
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("transformations", JSON.stringify(selectedTransformations));

    const result = await callApi("/openai/image-effect", formData);
    if (result) {
      setData(result);
    }
  };

  return (
    <div className="gap-4 p-4 grid sm:grid-cols-2">
      {/* Left Form */}
      <form className="card !px-5 flex-1 space-y-5" onSubmit={handleSubmit}>
        <div className="flex gap-2 items-center">
          <Sparkles className={`w-6 h-6`} style={{ color: aiTool.bg.from }} />
          <p className="font-medium">{aiTool.title}</p>
        </div>

        <div>
          <label htmlFor="ai-image-transform" className="font-medium text-sm">
            Upload Image
          </label>
          <input
            id="ai-image-transform"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm p-2 px-5 rounded-lg border outline-none"
            style={{ borderColor: aiTool.bg.from }}
          />
        </div>

        {previewUrl && (
          <div>
            <p className="font-medium text-sm mb-2">Image Preview</p>
            <img
              src={previewUrl}
              alt="Preview"
              className="rounded-lg max-h-60 w-auto"
            />
          </div>
        )}

        <div>
          <p className="text-sm font-medium">Select Transformations</p>
          <div className="flex flex-wrap gap-3 mt-2">
            {transformationOptions.map((trans, i) => (
              <button
                type="button"
                key={i}
                onClick={() => toggleTransformation(trans.value)}
                style={
                  selectedTransformations.some(
                    (t) => JSON.stringify(t) === JSON.stringify(trans.value)
                  )
                    ? {
                        border: `1px solid ${aiTool.bg.from}`,
                        color: aiTool.bg.from,
                      }
                    : { border: "1px solid #aaa" }
                }
                className="rounded-2xl text-nowrap w-fit text-xs px-4 py-1 text-gray-600">
                {trans.name}
              </button>
            ))}
          </div>
        </div>

        <button
          disabled={loading}
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

      {/* Right Content */}
      <div className="card !px-5 flex-1">
        <div className="flex gap-2 items-center">
          <aiTool.Icon
            className="lucide lucide-square-pen w-7 h-7 p-1 text-white rounded-xl"
            style={{
              background: `linear-gradient(to bottom, ${aiTool.bg.from}, ${aiTool.bg.to})`,
            }}
          />
          <p className="font-medium">Transformed Images</p>
        </div>
        {!data || data.length === 0 ? (
          <div className="min-h-[300px] h-full text-center flex items-center justify-center flex-col">
            <aiTool.Icon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <small className="text-gray-400">
              Your transformed images will appear here.
            </small>
          </div>
        ) : (
          <div className="mt-3 grid grid-cols-2 gap-4 overflow-y-auto max-h-[70vh]">
            {data.map((img, index) => (
              <div key={index}>
                <img
                  src={img.secure_url}
                  alt={`Transformation ${index + 1}`}
                  className="w-full rounded-lg shadow-md"
                />
                <p className="text-xs text-center mt-1 capitalize">
                  {img.transformation.replace(/[:_]/g, " ")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageTransformations;
