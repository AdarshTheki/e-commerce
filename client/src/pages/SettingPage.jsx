import React, { ReactNode, useState } from 'react';

import { Address, Avatar, General, Preference, Security } from '../components';

const ProfileSettings = () => {
  return (
    <div className='flex max-sm:flex-col min-h-screen gap-5 mt-10 justify-evenly items-start overflow-hidden'>
      {/* Profile Avatar */}
      <Avatar />
      {/* Tab Sections */}
      <div className='sm:w-1/2 w-full'>
        <Tabs>
          <div label='General'>
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
    <div className='px-3'>
      {/* Tab Header */}
      <div className='flex border-b border-gray-200 w-full overflow-x-auto scrollbar-hidden'>
        {React.Children.map(children, (child, index) => (
          <button
            key={index}
            className={`mr-5 py-2 font-medium border-b-2  text-gray-500 hover:text-gray-700 focus:outline-none ${
              index === activeTab ? '!border-indigo-500 text-indigo-700' : '!border-transparent'
            }`}
            onClick={() => handleTabClick(index)}>
            {React.isValidElement(child) && child.props.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className='py-4'>{React.Children.toArray(children)[activeTab].props.children}</div>
    </div>
  );
};
