import { Bot, Heart, Home, MessagesSquare, Settings } from 'lucide-react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Avatar } from '../utils';

const NavbarBottom = () => {
  const { user } = useSelector((s) => s.auth);
  const navigate = useNavigate();

  return (
    <footer className="sm:hidden shadow sticky bottom-0 py-2 px-4 w-full z-50 bg-white">
      <div className="flex items-center justify-between text-xs">
        <NavLink to="/" className="flex items-center justify-center flex-col">
          <Home className="w-5 h-5" />
          Home
        </NavLink>

        <NavLink
          to="/message"
          className="flex items-center justify-center flex-col">
          <MessagesSquare className="w-5 h-5" />
          Message
        </NavLink>

        <NavLink
          to="/favorite"
          className="flex items-center justify-center flex-col">
          <Heart className="w-5 h-5" />
          Wishlist
        </NavLink>

        <NavLink to="/ai" className="flex items-center justify-center flex-col">
          <Bot className="w-5 h-5" />
          AI Generate
        </NavLink>

        <button
          onClick={() => navigate('/setting')}
          className="flex items-center justify-center flex-col">
          {user?._id ? (
            <Avatar
              avatarUrl={user?.avatar}
              name={user?.fullName}
              className="!w-5 !h-5"
            />
          ) : (
            <Settings className="w-5 h-5" />
          )}
          Setting
        </button>
      </div>
    </footer>
  );
};

export default NavbarBottom;
