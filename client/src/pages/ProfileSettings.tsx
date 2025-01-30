import React, { useState } from 'react';
import { Input } from '../utils';

const Profile = () => {
  return (
    <section className='min-h-screen w-full'>
      <div className='bg-white sm:p-6 sm:flex justify-evenly'>
        {/* Profile Avatar */}
        <div className='flex flex-col items-center'>
          <div className='w-32 h-32 rounded-full border-4 border-neutral-600/30 overflow-hidden'>
            <img
              src='https://avatar.iran.liara.run/public'
              alt='Profile'
              className='w-full h-full object-cover transition-opacity duration-300 opacity-100'
              loading='lazy'
            />
          </div>
          <button className='mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 transition-colors duration-300 rounded-md text-white text-sm'>
            Change Photo
          </button>
        </div>

        {/* Tab Sections */}
        <div className='sm:w-1/2 mt-5'>
          <MyTabs />
        </div>
      </div>
    </section>
  );
};

export default Profile;

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className='flex border-b border-gray-200 w-full overflow-x-auto'>
        {React.Children.map(children, (child, index) => (
          <button
            key={index}
            className={`sm:px-4 px-3 py-2 font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 focus:outline-none ${
              index === activeTab ? 'border-blue-500 text-blue-700' : ''
            }`}
            onClick={() => handleTabClick(index)}>
            {child.props.label}
          </button>
        ))}
      </div>
      <div className='p-4'>{React.Children.toArray(children)[activeTab].props.children}</div>
    </div>
  );
};

const Tab = ({ label, children }) => {
  return null; // This component doesn't render anything directly
};

const MyTabs = () => {
  return (
    <Tabs>
      <Tab label={'General'}>
        <>
          <h2 className='text-lg font-semibold'>General Settings</h2>
          <form>
            <div className='grid grid-cols-1 pt-5 gap-6 sm:grid-cols-2'>
              <Input name='First Name' label='First Name' />
              <Input name='Last Name' label='Last Name' />
              <Input name='Email' label='Email' />
              <Input name='Phone' label='Phone' />
            </div>
            <button
              type='submit'
              className='px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-300 rounded-md text-white'>
              Save Changes
            </button>
          </form>
        </>
      </Tab>
      <Tab label='Address'>
        <>
          <h2 className='text-lg font-semibold'>General Address</h2>
          <form className='pt-5'>
            <Input name='Street Address' label='Street Address' />
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
              <Input name='City' label='City' />
              <Input name='State/Province' label='State/Province' />
              <Input name='Postal Code' label='Postal Code' />
              <Input name='Country' label='Country' />
            </div>
            <button
              type='submit'
              className='px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-300 rounded-md text-white'>
              Save Changes
            </button>
          </form>
        </>
      </Tab>
      <Tab label='Security'>
        <>
          <h2 className='text-lg font-semibold'>Change Password</h2>
          <form className='pt-5'>
            <Input name='Last Name' label='Last Name' />
            <Input name='Email' label='Email' />
            <button
              type='submit'
              className='px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-300 rounded-md text-white'>
              Save Changes
            </button>
          </form>
        </>
      </Tab>
      <Tab label='Preferences'>
        <div id='preference'>
          <h3 className='text-lg font-semibold'>Preferences</h3>
          <div className='space-y-4 pt-5'>
            <div className='flex items-center justify-between'>
              <div>
                <h4 className='text-gray-700 font-medium'>Email Notifications</h4>
                <p className='text-neutral-600 text-sm'>
                  Receive emails about your account activity
                </p>
              </div>
              <label className='relative inline-flex items-center cursor-pointer'>
                <input type='checkbox' className='sr-only peer' />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className='flex items-center justify-between'>
              <div>
                <h4 className='text-gray-700 font-medium'>Order Updates</h4>
                <p className='text-neutral-600 text-sm'>Get updates about your order status</p>
              </div>
              <label className='relative inline-flex items-center cursor-pointer'>
                <input type='checkbox' className='sr-only peer' />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className='flex items-center justify-between'>
              <div>
                <h4 className='text-gray-700 font-medium'>Marketing Preferences</h4>
                <p className='text-gray-600 text-sm'>Receive marketing emails and promotions</p>
              </div>
              <label className='relative inline-flex items-center cursor-pointer'>
                <input type='checkbox' className='sr-only peer' />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </Tab>
    </Tabs>
  );
};
