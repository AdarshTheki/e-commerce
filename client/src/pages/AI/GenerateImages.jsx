import React, { useState } from "react";
import { AiToolsData } from "../../assets/assets";
import { Sparkles } from "lucide-react";

const GenerateImage = () => {
  const styleData = [
    "Realistic",
    "Ghibli style",
    "Anime style",
    "Cartoon style",
    "Fantasy style",
    "Realistic style",
    "3D style",
    "Portrait style",
  ];
  const [selected, setSelected] = useState("Realistic");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const aiTool = AiToolsData[2];

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(input, selected, isPublic);
    setTimeout(() => {
      setLoading(false);
      setIsPublic(false);
      setInput("");
      setSelected("Realistic");
    }, 1000);
  };

  return (
    <div className="gap-4 p-4 grid sm:grid-cols-2">
      {/* Left Create Form */}
      <form className="card !px-5 flex-1 space-y-5" onSubmit={handleSubmitForm}>
        <div className="flex gap-2 items-center">
          <Sparkles className={`w-6 h-6`} style={{ color: aiTool.bg.from }} />
          <p className="font-medium">{aiTool.title}</p>
        </div>
        <label htmlFor="ai-image" className="font-medium text-sm">
          Describe Your Image
        </label>
        <textarea
          name="ai-image"
          id="ai-image"
          cols={5}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full text-sm p-4 rounded-lg border outline-none"
          style={{ borderColor: aiTool.bg.from }}></textarea>

        <div>
          <p className="text-sm font-medium">Style</p>
          <div className="flex flex-wrap gap-3 mt-2">
            {styleData.map((style, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setSelected(style)}
                style={
                  selected === style
                    ? {
                        border: `1px solid ${aiTool.bg.from}`,
                        color: aiTool.bg.from,
                      }
                    : { border: "1px solid #aaa" }
                }
                className="rounded-2xl text-nowrap w-fit text-xs px-4 py-1 text-gray-600">
                {style}
              </button>
            ))}
          </div>
        </div>

        <label
          class="relative cursor-pointer flex gap-2"
          onClick={() => setIsPublic(!isPublic)}>
          <input
            class="sr-only peer"
            type="checkbox"
            value={isPublic}
            checked={isPublic}
            onChange={() => setIsPublic((prev) => !prev)}
          />
          <div
            className={`w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-[var(--primary)] transition`}></div>
          <span class="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></span>
          <small>Make this image Public</small>
        </label>

        <button
          style={{
            background: `linear-gradient(to bottom, ${aiTool.bg.from}, ${aiTool.bg.to})`,
          }}
          className="py-2 mt-8 flex hover:opacity-85 text-white rounded-full items-center justify-center gap-2 !text-sm w-full">
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
          <aiTool.Icon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <small className="text-gray-400">
            Enter a topic and click “{aiTool.title} ” to get started
          </small>
        </div>
      </div>
    </div>
  );
};

export default GenerateImage;
