import { FiSearch, FiUser, FiBell } from "react-icons/fi";
import { useState } from "react";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Toggle search bar
  const [cartCount, setCartCount] = useState(0); // Cart count
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Toggle profile dropdown
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Toggle mobile menu
  const [isActive, setIsActive] = useState("#home"); //set active link

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleHoverDropdown = (state) => {
    setIsDropdownOpen(state); // Toggle dropdown based on hover state
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
      <div className="flex justify-between items-center">
        {/* Brand */}
        <a href="/" className="text-xl font-semibold">
          Praise Shop
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <a
            href="#home"
            onClick={() => setIsActive("#home")}
            className={
              isActive === "#home"
                ? `text-gray-600 hover:border-b-2 p-x-5  pb-1 font-outfit font-medium border-black`
                : `text-gray-600 hover:border-b-2 p-x-5 pb-1 font-outfit font-medium hover:border-black`
            }
          >
            Home
          </a>
          <a
            href="#collection"
            onClick={() => setIsActive("#collection")}
            className={
              isActive === "#home"
                ? `text-gray-600 hover:border-b-2 p-x-5 hover:border-black pb-1 font-outfit font-medium border-black`
                : `text-gray-600 hover:border-b-2 p-x-5 pb-1 font-outfit font-medium`
            }
          >
            Collection
          </a>
          <a
            href="#"
            className="text-gray-600 hover:border-b-2 hover:border-black pb-1 font-outfit font-medium"
          >
            About
          </a>
          <a
            href="#"
            className="text-gray-600 hover:border-b-2 hover:border-black pb-1 font-outfit font-medium"
          >
            Contact us
          </a>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-6 relative">
          {/* Search Icon */}
          <div className="relative">
            <FiSearch
              size={20}
              onClick={handleSearchToggle}
              className="cursor-pointer"
            />
            {isSearchOpen && (
              <input
                type="text"
                className="absolute top-[-10px] right-5 p-2 border rounded-md shadow-md w-50 focus:outline-none focus:ring-0 text-sm font-medium text-gray-700"
                placeholder="Search..."
              />
            )}
          </div>

          {/* Profile Icon with Hover Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleHoverDropdown(true)}
            onMouseLeave={() => handleHoverDropdown(false)}
          >
            <FiUser size={20} className="cursor-pointer" />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-md w-40">
                <ul className="py-2">
                  {false ? ( // Replace `false` with the actual login state
                    <>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-outfit font-normal">
                        Profile
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-outfit font-normal">
                        Orders
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-outfit font-normal">
                        Logout
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-outfit font-normal">
                        Login
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-outfit font-normal">
                        Signup
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Bell Icon with Cart Count */}
          <div className="relative cursor-pointer">
            <FiBell size={20} />
            <span className="absolute top-[+2px] right-[-8px] bg-red-500 text-white text-xs rounded-full px-1">
              {cartCount}
            </span>
          </div>

          {/* Hamburger Menu */}
          <button
            className="block md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-1 bg-gray-600 mb-1"></div>
            <div className="w-6 h-1 bg-gray-600 mb-1"></div>
            <div className="w-6 h-1 bg-gray-600"></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <a
            href="#"
            className="block text-gray-600 hover:border-b-2 hover:border-black pb-1 font-outfit font-medium"
          >
            Home
          </a>
          <a
            href="#"
            className="block text-gray-600 hover:border-b-2 hover:border-black pb-1 font-outfit font-medium"
          >
            Collection
          </a>
          <a
            href="#"
            className="block text-gray-600 hover:border-b-2 hover:border-black pb-1 font-outfit font-medium"
          >
            About
          </a>
          <a
            href="#"
            className="block text-gray-600 hover:border-b-2 hover:border-black pb-1 font-outfit font-medium"
          >
            Contact us
          </a>
        </div>
      )}
    </nav>
  );
}
