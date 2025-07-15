import React, { useState } from "react";
import { AiToolsData } from "../../assets/assets";
import { toast } from "react-toastify";
import AIToolLayout from "./AIToolLayout";
import useApi from "../../hooks/useApi";

const WriteArticle = () => {
  const styleData = [
    "Short (200-300 word)",
    "Medium (600-800 word)",
    "Long (1200+ word)",
  ];
  const [selected, setSelected] = useState(styleData[0]);
  const [input, setInput] = useState("");
  const { loading, data, callApi, setData } = useApi();

  const aiTool = {
    ...AiToolsData[0],
    inputLabel: "Article Topic",
    placeholder: "The future of artificial intelligence...",
    styleLabel: "Article Length",
  };

  const handleSubmit = async () => {
    if (!input.trim()) return toast.error("Enter a valid article topic");
    const result = await callApi("/openai/generate-article", {
      prompt: `Write a article about this "${input}" in ${selected}`,
      length:
        styleData[0] === selected
          ? 1000
          : styleData[1] === selected
          ? 3000
          : 8000,
    });
    if (result) {
      setData(result);
      setSelected(styleData[0]);
      setInput("");
    }
  };

  return (
    <AIToolLayout
      aiTool={aiTool}
      styleData={styleData}
      handleSubmit={handleSubmit}
      input={input}
      setInput={setInput}
      selected={selected}
      setSelected={setSelected}
      loading={loading}
      data={data}
    />
  );
};

export default WriteArticle;
