import React, { useState } from "react";
import { Sparkles, Image as ImageIcon } from "lucide-react";
import useApi from "../../hooks/useApi";

const GenerateImage = () => {
  const styleData = [
    "Realistic",
    "Ghibli style",
    "Anime style",
    "Cartoon style",
    "Fantasy style",
    "3D style",
    "Portrait style",
  ];
  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [prompt, setPrompt] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const { loading, data: generatedImage, callApi } = useApi();

  const handleSubmit = (e) => {
    e.preventDefault();
    callApi("/cloudinary/generate-image", { prompt, style: selectedStyle, isPublic });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
      {/* Form Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <Sparkles className="w-8 h-8 text-purple-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Generate Image</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">Describe Your Image</label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="4"
              placeholder="e.g., a cute cat playing with a ball of yarn"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
            <div className="flex flex-wrap gap-3">
              {styleData.map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setSelectedStyle(style)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedStyle === style ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                  {style}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <input
              id="is-public"
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="is-public" className="ml-2 block text-sm text-gray-900">Make this image public</label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? "Generating..." : "Generate Image"}
          </button>
        </form>
      </div>

      {/* Image Display Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 flex items-center justify-center">
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
            <p className="mt-4 text-gray-600">Generating your image...</p>
          </div>
        ) : generatedImage ? (
          <img src={generatedImage} alt="Generated" className="rounded-lg shadow-md" />
        ) : (
          <div className="text-center text-gray-500">
            <ImageIcon size={64} className="mx-auto mb-4" />
            <p>Your generated image will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateImage;
