import React, { useState } from 'react';
import { AiToolsData } from '../../assets/assets';
import useApi from '../../hooks/useApi';
import AIToolLayout from './AIToolLayout';

const BlogTitles = () => {
  const styleData = [
    'General',
    'Technology',
    'Business',
    'Health',
    'Lifestyle',
    'Education',
    'Travel',
    'Food',
  ];
  const [selected, setSelected] = useState('General');
  const [input, setInput] = useState('');
  const { loading, data, callApi, setData } = useApi();

  const aiTool = {
    ...AiToolsData[1],
    inputLabel: 'Keyword',
    placeholder: 'The future of artificial intelligence...',
    styleLabel: 'Category',
  };

  const handleSubmit = async () => {
    const result = await callApi('/openai/generate-text', {
      prompt: `Generate an blog title about "${input}" in category of ${selected} with in 100 words in a point wise.`,
    });
    if (result) {
      setData(result);
      setSelected(styleData[0]);
      setInput('');
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

export default BlogTitles;
