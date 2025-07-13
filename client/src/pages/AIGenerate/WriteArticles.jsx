import React, { useState } from "react";
import { AiToolsData } from "../../assets/assets";
import { Sparkles } from "lucide-react";

const WriteArticle = () => {
  const styleData = [
    "Short (500-800 word)",
    "Medium (800-1200 word)",
    "Long (1200+ word)",
  ];
  const [selected, setSelected] = useState("Short (500-800 word)");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const aiTool = AiToolsData[0];

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(input, selected);
    setTimeout(() => {
      setLoading(false);
      setInput("");
      setSelected("Short (500-800 word)");
    }, 1000);
  };

  return (
    <div className="flex gap-4 p-4 max-sm:flex-col">
      {/* Left Create Form */}
      <form className="card !px-5 flex-1 space-y-5" onSubmit={handleSubmitForm}>
        <div className="flex gap-2 items-center">
          <Sparkles className={`w-6 h-6`} style={{ color: aiTool.bg.from }} />
          <p className="font-medium">{aiTool.title}</p>
        </div>
        <label htmlFor="ai-Article-Topic" className="font-medium text-sm">
          Article Topic
        </label>
        <input
          name="ai-Article-Topic"
          id="ai-Article-Topic"
          placeholder="The feature fo artificial intelligence..."
          className="w-full text-sm p-2 px-5 rounded-lg border outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ borderColor: aiTool.bg.from }}
        />

        <div>
          <p className="text-sm font-medium">Article Length</p>
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
          <aiTool.Icon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <small className="text-gray-400">
            Enter a topic and click “{aiTool.title}” to get started
          </small>
        </div>
      </div>
    </div>
  );
};

export default WriteArticle;
