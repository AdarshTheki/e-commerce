import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from '../redux/store';
import { Phone, Mail, ShoppingCart, CakeSlice, Menu, MapPin, Store, Search, X } from 'lucide-react';
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
    <>
      <header className='sticky top-0 left-0 w-full bg-white shadow-sm z-20 text-gray-700'>
        <div className='max-w-7xl mx-auto px-4 relative'>
          {/* Top Bar*/}
          <div className='flex justify-between items-center py-2 text-sm border-b border-gray-200'>
            <div className='flex items-center gap-4'>
              <a href='#' className='flex items-center gap-1 hover:text-indigo-600'>
                <Phone size={18} />
                <span>+1 234 567 890</span>
              </a>
              <a href='#' className='flex items-center gap-1 hover:text-indigo-600'>
                <Mail size={18} />
                <span>support@store.com</span>
              </a>
            </div>
            <div className='flex items-center sm:gap-6 gap-3'>
              <a
                title='Track Order'
                href='#'
                className='hover:text-indigo-600 flex gap-1 items-center'>
                <MapPin size={18} /> <span className='max-sm:hidden'>Track Order</span>
              </a>
              <a
                title='Store Locator'
                href='#'
                className='hover:text-indigo-600 flex gap-1 items-center'>
                <Store size={18} /> <span className='max-sm:hidden'>Store Locator</span>
              </a>
            </div>
          </div>

          {/* Main Header*/}
          <div className='flex items-center justify-end py-2 sm:py-4'>
            {/* Mobile Menu Button*/}
            {/* <button className='lg:hidden p-2 hover:bg-gray-100 rounded-lg'>
            <Menu />
          </button> */}

            {/* Desktop Search Bar */}
            <div className='flex flex-1 mx-4 relative max-sm:hidden'>
              <div
                className={`w-full flex items-center border rounded-lg border-gray-300 ${
                  isDropdownOpen && 'border-indigo-600'
                }`}>
                <Search size={20} className='mx-4' />
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
                <div className='w-full absolute top-10 border border-gray-300 left-0 ring-0 min-h-32 h-fit bg-white p-4 rounded-lg shadow-lg'>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, aut.</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, aut.</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, aut.</p>
                </div>
              )}
            </div>

            {/* Right Actions*/}
            <div className='flex items-center gap-5'>
              {searchOpen ? (
                <X
                  size={26}
                  className='sm:hidden cursor-pointer'
                  onClick={() => setSearchOpen(false)}
                />
              ) : (
                <Search
                  size={26}
                  className='sm:hidden cursor-pointer'
                  onClick={() => setSearchOpen(true)}
                />
              )}

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
                      className='w-9 h-9 rounded-full transition-opacity duration-300 opacity-100'
                      loading='lazy'
                    />
                  </NavLink>
                ) : (
                  <NavLink to={'/login'} className='hover:text-indigo-600 text-sm'>
                    <img
                      src='https://avatar.iran.liara.run/public'
                      alt='User'
                      className='w-7 h-7 rounded-full transition-opacity duration-300 opacity-100'
                      loading='lazy'
                    />{' '}
                    Sign In
                  </NavLink>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {searchOpen && (
            <div className='flex flex-1 mx-4 relative sm:hidden pb-4'>
              <div
                className={`w-full flex items-center border rounded-lg border-gray-300 ${
                  isDropdownOpen && 'border-indigo-600'
                }`}>
                <Search size={26} className='mx-4' />
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
                <div className='w-full absolute top-10 border border-gray-300 left-0 ring-0 min-h-32 h-fit bg-white p-4 rounded-lg shadow-lg'>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, aut.</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, aut.</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, aut.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
      <div className='flex items-center w-full overflow-x-auto scrollbar-hidden py-2 bg-white shadow-md gap-5 text-sm font-medium text-gray-700 capitalize pl-2 sm:pl-10'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/product'>Products</NavLink>
        <NavLink to='/cart'>Cart</NavLink>
        <NavLink to='/checkout'>checkout</NavLink>
        <NavLink to='/setting'>Setting</NavLink>
        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/register'>Register</NavLink>
      </div>
    </>
  );
};

export default Header;
