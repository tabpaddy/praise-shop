import { FiSearch, FiUser, FiBell } from "react-icons/fi";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchModal from "./SearchModal";
import { UserContext } from "../../../context/UserContext";
import LogoutUserModal from "./LogoutUserModal";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../axiosInstance/api";
import { setUserCart } from "../../../redux/CartSlice";

export default function Header() {
  const { user } = useContext(UserContext); // Access user state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [logoutUserModal, setLogoutUserModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  const dispatch = useDispatch();

  // Access Redux cart for guest users
  const { cart, cart_id } = useSelector((state) => state.cart);

  //const cartCount = cart.length; // Get count dynamically
  // if (user) {
  //   const fetchUser = async () => {
  //     try {
  //       await api.get("/sanctum/csrf-cookie"); // Ensure CSRF token is fetched first

  //       const response = await api.get("/api/user", {
  //         headers: {
  //           Authorization: `Bearer ${user?.userToken}`, // Ensure userToken is set

  //         },
  //         withCredentials: true,
  //       });

  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Fetch User Error:", error.response);
  //     }
  //   };

  //   fetchUser();
  // }

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  const handleSearchClick = () => {
    setIsDropdownOpen(false); // Close the profile dropdown
    setIsSearchOpen(true); // Open the search modal
  };

  const logoutUserModalClick = () => {
    setIsDropdownOpen(false); // Close the profile dropdown
    setLogoutUserModal(true);
  };

  const toggleProfileDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsSearchOpen(false); // Close the search modal
    setIsMenuOpen(false); // Close the menu
    setLogoutUserModal(false);
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

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch CSRF token before sending requests
  // const fetchCsrfToken = async () => {
  //   await api.get("/sanctum/csrf-cookie");
  // };

  // Fetch cart count for logged-in users
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const headers = {
          Authorization: user ? `Bearer ${user.userToken}` : "",
        };

        // Merge guest cart if user logs in with a cart_id
        if (user && cart_id) {
          await api.post(
            "/api/merge-cart",
            { cart_id: cart_id },
            { headers, withCredentials: true }
          );
          const cartResponse = await api.get(`/api/cart/${user.id}`, {
            headers,
            withCredentials: true,
          });
          dispatch(setUserCart(cartResponse.data));
        }

         // Fetch cart count
         const endpoint = user ? `/api/count-cart` : `/api/count-cart`;
         const response = await api.post(
           endpoint,
           { cart_id: cart_id },
           { headers, withCredentials: true }
         );
        // console.log(response.data.count);
        setCartCount(response.data.count);
      } catch (error) {
        console.error("Error fetching cart count:", error);
        setCartCount(cart.length); // Fallback to localStorage count
      }
    };

   
    if (cart_id || user) {
      fetchCartCount();
    } else {
      setCartCount(cart.length); // Use local count if no cart_id or user
    }
  }, [user, cart_id, cart.length, dispatch]);

  // console.log(user)
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
            <div ref={dropdownRef}>
              {" "}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-gray-100 border rounded-md shadow-md w-40">
                  <ul className="py-2">
                    {user ? (
                      <>
                        <li>
                          <Link
                            to="/padp"
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
                          <button
                            to="/logout"
                            className="block px-4 py-2 hover:bg-gray-100 cursor-pointer font-outfit font-normal"
                            onClick={
                              toggleProfileDropdownClose && logoutUserModalClick
                            }
                          >
                            Logout
                          </button>
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
              )}{" "}
            </div>
          </div>

          <div className="relative cursor-pointer">
            <Link to={"/cart"}>
              <FiBell size={20} />
              <span className="absolute top-[+3px] right-[-5px] bg-stone-900 text-white text-xs rounded-full px-1">
                {cartCount}
              </span>
            </Link>
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

      {/* Import and use the LogoutUserModal */}
      <LogoutUserModal
        modalOpen={logoutUserModal}
        modalClose={() => setLogoutUserModal(false)}
      />
    </nav>
  );
}
