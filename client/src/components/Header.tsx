import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from '../redux/store';
import { ShoppingCart, CakeSlice, Search, X, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const Header = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle input blur
  const handleBlur = () => {
    // Delay closing the dropdown to allow dropdown item clicks to be processed
    setTimeout(() => {
      if (!dropdownRef.current?.contains(document.activeElement)) {
        setIsDropdownOpen(false);
      }
    }, 100);
  };

  // Handle item selection
  const handleItemSelect = (item: string) => {
    setSearchTerm(item);
    setIsDropdownOpen(false);
    inputRef.current?.focus(); // Optionally refocus the input after selection
  };

  return (
    <header className='sticky top-0 left-0 w-full bg-white z-20 text-gray-700'>
      <div className='px-4 relative'>
        {/* Main Header*/}
        <div className='flex items-center justify-end gap-4 py-2'>
          {/* Desktop Search Bar */}
          <div
            className={`w-full max-w-[400px] flex items-center border rounded-lg border-gray-300 ${
              isDropdownOpen && 'border-indigo-600'
            }`}>
            <Search size={20} className='sm:mx-4 mx-2' />
            <input
              type='text'
              placeholder='Search products...'
              className='w-full py-1.5 border-none outline-none'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsDropdownOpen(true)}
              onBlur={handleBlur}
              ref={inputRef}
            />
          </div>
          {isDropdownOpen && (
            <div className='w-full min-w-[330px] max-w-[800px] absolute top-12 border border-gray-300 max-sm:left-0 ring-0 min-h-32 h-fit bg-white p-4 rounded-lg shadow-lg'>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, aut.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, aut.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, aut.</p>
            </div>
          )}

          {/* Right Actions*/}
          <div className='flex items-center gap-4'>
            <NavLink to={'/cart'} className='relative hover:text-indigo-600'>
              <ShoppingCart size={26} />
              <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>
                0
              </span>
            </NavLink>

            <NavLink to={'/wishlist'} className='relative hover:text-indigo-600'>
              <CakeSlice size={26} />
              <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>
                0
              </span>
            </NavLink>

            <div className='flex items-center gap-1'>
              {user?.email ? (
                <NavLink to={'/setting'}>
                  <img
                    src='https://avatar.iran.liara.run/public'
                    alt='User'
                    className='min-w-9 min-h-9 h-9 w-9 rounded-full transition-opacity duration-300 opacity-100'
                    loading='lazy'
                  />
                </NavLink>
              ) : (
                <NavLink to={'/login'} className='hover:text-indigo-600 text-sm'>
                  <User size={26} />
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
