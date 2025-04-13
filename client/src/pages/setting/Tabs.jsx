import React, { useState } from "react";

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="p-4 min-h-[400px] my-6 bg-white shadow-md rounded-lg">
      {/* Tab Header */}
      <div className="flex w-full overflow-x-auto scrollbar-hidden">
        {React.Children.map(children, (child, index) => (
          <button
            key={index}
            className={`mr-8 border-b-2 font-medium hover:text-gray-700 focus:outline-none ${
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
      {React.Children.toArray(children)[activeTab].props.children}
    </div>
  );
};

export default Tabs;
