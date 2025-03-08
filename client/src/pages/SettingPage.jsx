import React, { ReactNode, useState } from 'react';

import { Address, Avatar, General, Preference, Security } from '../components';

const ProfileSettings = () => {
  return (
    <div className='w-full'>
      {/* Tab Sections */}
      <Tabs>
        <div label='General'>
          {/* Profile Avatar */}
          <Avatar />
          <General />
        </div>
        <div label='Address'>
          <Address />
        </div>
        <div label='Security'>
          <Security />
        </div>
        <div label='Preferences'>
          <Preference />
        </div>
      </Tabs>
    </div>
  );
};
export default ProfileSettings;

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className='p-2 bg-gray-100'>
      {/* Tab Header */}
      <div className='flex w-full bg-white p-4 rounded-lg overflow-x-auto scrollbar-hidden'>
        {React.Children.map(children, (child, index) => (
          <button
            key={index}
            className={`mr-8 border-b-2 text-gray-500 hover:text-gray-700 focus:outline-none ${
              index === activeTab ? '!border-indigo-500 text-indigo-700' : '!border-transparent'
            }`}
            onClick={() => handleTabClick(index)}>
            {React.isValidElement(child) && child.props.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className='p-4 bg-white rounded-lg mt-4'>
        {React.Children.toArray(children)[activeTab].props.children}
      </div>
    </div>
  );
};
