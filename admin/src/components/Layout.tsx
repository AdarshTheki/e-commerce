import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Menu, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar';
import { menuItems } from '@/lib/utils';

const Layout: React.FC = () => {
  const { user } = useSelector((s: RootState) => s.auth);
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:flex">
      {/* <!-- Desktop Menu --> */}
      <nav className="h-screen sticky top-0 flex-shrink-0 w-64 border-r hidden lg:block">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="logo" className="w-8 h-8" />
              <span className="text-xl font-semibold">Admin</span>
            </div>
          </div>
          <div className="flex-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className="flex gap-2 items-center mb-2 pl-8 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-200">
                {<item.icon size={22} />}
                <span>{item.title}</span>
              </NavLink>
            ))}
          </div>
          <div className="px-4 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-200">
            <NavLink
              to={user?.email ? '/profile' : '/login'}
              className="flex items-center space-x-3">
              <Avatar style={{ width: 50, height: 50 }}>
                <AvatarImage src={user?.avatar} alt="avatar" />
                <AvatarFallback>
                  {user?.fullName.substring(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="text-sm font-medium uppercase">
                  {user?.fullName || 'Admin'}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.email || 'admin@example.com'}
                </p>
                <p className="text-xs text-blue-800">{user?.role || 'Guest'}</p>
              </div>
            </NavLink>
          </div>
        </div>
      </nav>

      {/* <!-- Mobile Menu --> */}
      <div className="py-2 hidden max-lg:flex px-4 bg-white top-0 sticky z-40 shadow">
        <button onClick={() => setOpen(true)} className="svg-btn">
          {!open && <Menu />}
        </button>
      </div>
      <div
        className={`
          fixed inset-0 h-screen z-50 bg-gray-700/30 shadow-lg overflow-hidden rounded-b-2xl
          transform duration-300 ease-linear lg:hidden
          ${open ? 'left-0 opacity-100' : 'left-[100%] opacity-0'}
        `}>
        <div className="p-4 py-6 space-y-4 bg-white w-full h-full">
          <button
            onClick={() => setOpen(false)}
            className="svg-btn absolute top-3 right-5">
            <X size={30} />
          </button>
          {menuItems.map((item) => (
            <NavLink
              onClick={() => setOpen(false)}
              key={item.id}
              to={item.path}
              className="flex items-center text-lg px-4 py-2 text-gray-600 transition-colors duration-300 rounded-lg hover:bg-gray-100">
              {<item.icon size={22} />}
              <span className="ml-3">{item.title}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Main Body */}
      <main className="min-h-screen sm:overflow-y-auto w-full p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
