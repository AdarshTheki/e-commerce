import React, { useState } from "react";

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      {/* Tab Header */}
      <div className="flex w-full p-4 rounded-lg overflow-x-auto scrollbar-hidden border border-gray-200">
        {React.Children.map(children, (child, index) => (
          <button
            key={index}
            className={`mr-8 border-b-2 hover:text-gray-700 focus:outline-none ${
              index === activeTab
                ? "!border-indigo-500 text-indigo-700"
                : "!border-transparent"
            }`}
            onClick={() => handleTabClick(index)}>
            {React.isValidElement(child) && child.props.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-4 bg-white rounded-lg min-h-[400px] border border-gray-200">
        {React.Children.toArray(children)[activeTab].props.children}
      </div>
    </>
  );
};

export default Tabs;
