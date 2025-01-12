import { FiSearch, FiUser, FiBell } from "react-icons/fi";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchModal from "./SearchModal";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleSearchClick = () => {
    setIsDropdownOpen(false); // Close the profile dropdown
    setIsSearchOpen(true); // Open the search modal
  };

  const toggleProfileDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsSearchOpen(false); // Close the search modal
    setIsMenuOpen(false); // Close the menu
  };

  const toggleProfileDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSearchOpen(false); // Close the search modal
    setIsDropdownOpen(false); // Close the profile dropdown
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold">
          Praise Shop
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className={`text-gray-600 pb-1 font-outfit font-medium ${
              isActive("/")
                ? "border-b-2 border-black"
                : "hover:border-b-2 hover:border-black"
            }`}
          >
            Home
          </Link>
          <Link
            to="/collection"
            className={`text-gray-600 pb-1 font-outfit font-medium ${
              isActive("/collection")
                ? "border-b-2 border-black"
                : "hover:border-b-2 hover:border-black"
            }`}
          >
            Collection
          </Link>
          <Link
            to="/about"
            className={`text-gray-600 pb-1 font-outfit font-medium ${
              isActive("/about")
                ? "border-b-2 border-black"
                : "hover:border-b-2 hover:border-black"
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`text-gray-600 pb-1 font-outfit font-medium ${
              isActive("/contact")
                ? "border-b-2 border-black"
                : "hover:border-b-2 hover:border-black"
            }`}
          >
            Contact Us
          </Link>
        </div>

        <div className="flex items-center space-x-6 relative">
          <div className="relative">
            <FiSearch
              size={20}
              onClick={handleSearchClick} // Close dropdown and open modal
              className="cursor-pointer"
            />
          </div>

          <div className="relative">
            <FiUser
              size={20}
              className="cursor-pointer"
              onClick={toggleProfileDropdown}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-md w-40">
                <ul className="py-2">
                  {false ? (
                    <>
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 hover:bg-gray-100 cursor-pointer font-outfit font-normal"
                          onClick={toggleProfileDropdownClose}
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/orders"
                          className="block px-4 py-2 hover:bg-gray-100 cursor-pointer font-outfit font-normal"
                          onClick={toggleProfileDropdownClose}
                        >
                          Orders
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/logout"
                          className="block px-4 py-2 hover:bg-gray-100 cursor-pointer font-outfit font-normal"
                          onClick={toggleProfileDropdownClose}
                        >
                          Logout
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          to="/login"
                          className="block px-4 py-2 hover:bg-gray-100 cursor-pointer font-outfit font-normal"
                          onClick={toggleProfileDropdownClose}
                        >
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/signup"
                          className="block px-4 py-2 hover:bg-gray-100 cursor-pointer font-outfit font-normal"
                          onClick={toggleProfileDropdownClose}
                        >
                          Signup
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>

          <div className="relative cursor-pointer">
            <FiBell size={20} />
            <span className="absolute top-[+2px] right-[-8px] bg-red-500 text-white text-xs rounded-full px-1">
              {cartCount}
            </span>
          </div>

          <button className="block md:hidden" onClick={handleMenuToggle}>
            <div className="w-6 h-1 bg-gray-600 mb-1"></div>
            <div className="w-6 h-1 bg-gray-600 mb-1"></div>
            <div className="w-6 h-1 bg-gray-600"></div>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-2 transition-all duration-300 ease-in-out">
          <Link
            to="/"
            className="block text-gray-600 hover:border-b-2 hover:border-black pb-1 font-outfit font-medium"
            onClick={handleMenuClose}
          >
            Home
          </Link>
          <Link
            to="/collection"
            className="block text-gray-600 hover:border-b-2 hover:border-black pb-1 font-outfit font-medium"
            onClick={handleMenuClose}
          >
            Collection
          </Link>
          <Link
            to="/about"
            className="block text-gray-600 hover:border-b-2 hover:border-black pb-1 font-outfit font-medium"
            onClick={handleMenuClose}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block text-gray-600 hover:border-b-2 hover:border-black pb-1 font-outfit font-medium"
            onClick={handleMenuClose}
          >
            Contact Us
          </Link>
        </div>
      )}

      {/* Import and use the SearchModal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </nav>
  );
}
