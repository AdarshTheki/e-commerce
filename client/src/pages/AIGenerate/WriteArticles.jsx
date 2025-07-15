import React, { useState } from "react";
import { AiToolsData } from "../../assets/assets";
import { Sparkles } from "lucide-react";
import { axios, errorHandler } from "../../helper";
import { toast } from "react-toastify";
import Markdown from "react-markdown";
import useTypewriter from "../../hooks/useTypewriter";

const WriteArticle = () => {
  const styleData = [
    "Short (200-300 word)",
    "Medium (600-800 word)",
    "Long (1200+ word)",
  ];
  const [selected, setSelected] = useState(styleData[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const aiTool = AiToolsData[0];

  const [data, setData] = useState(null);
  const { displayText } = useTypewriter({
    text: data?.response || "",
    speed: 5,
  });

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!input.trim()) return toast.error("Enter a valid article topic");
    setLoading(true);
    setData(null);
    try {
      const res = await axios.post("/openai/generate-article", {
        prompt: `Write a article about this "${input}" in ${selected}"`,
        length:
          styleData[0] === selected
            ? 1000
            : styleData[1] === selected
              ? 3000
              : 8000,
      });
      if (res.data) {
        setData(res.data.result);
        setSelected(styleData[0]);
        setInput("");
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gap-4 p-4 grid sm:grid-cols-2">
      {/* Left Create Form */}
      <form className="card !px-5 space-y-5" onSubmit={handleSubmitForm}>
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

      {/* Right Generate Content */}
      <div className="card !px-5">
        <div className="flex gap-2 items-center">
          <aiTool.Icon
            className="lucide lucide-square-pen w-7 h-7 p-1 text-white rounded-xl"
            style={{
              background: `linear-gradient(to bottom, ${aiTool.bg.from}, ${aiTool.bg.to}`,
            }}
          />
          <p className="font-medium">{aiTool.title}</p>
        </div>

        {!data?.response ? (
          <div className="h-full text-center flex items-center justify-center flex-col">
            <aiTool.Icon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <small className="text-gray-400">
              Enter a topic and click “{aiTool.title}” to get started
            </small>
          </div>
        ) : (
          <div className="mt-3 overflow-y-auto text-sm text-slate-600">
            <div className="reset-tw">
              <Markdown>{displayText}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WriteArticle;
