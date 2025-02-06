import { useContext, useState } from "react";
import {
  FaTimes,
  FaBars,
  FaHome,
  FaUserAlt,
  FaProductHunt,
  FaChevronDown,
  FaSignOutAlt,
  FaListAlt,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { AdminContext } from "../../../../context/AdminContext";
import { MdCategory } from "react-icons/md";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false); // Sidebar toggle for mobile
  const [activeDropdown, setActiveDropdown] = useState(""); // Tracks the active dropdown
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const toggleDropdown = (dropdownName) => {
    // Toggle the dropdown, close if the same one is clicked
    setActiveDropdown((prev) => (prev === dropdownName ? "" : dropdownName));
  };

  const { logoutAdmin } = useContext(AdminContext);

  const logoutAdminSubmit = () => {
    logoutAdmin();
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 w-64 bg-black text-white h-screen z-30 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 flex flex-col justify-between`}
      >
        {/* Sidebar Header */}
        <div>
          <div className="p-4 flex justify-between items-center lg:mt-0 mt-14">
            <h1 className="text-xl font-bold hidden lg:block">Admin Panel</h1>
            <button
              className="lg:hidden text-xl text-stone-100"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="space-y-4 p-4">
            <Link
              to="/admin/dashboard"
              className={`flex items-center gap-3 hover:text-gray-300 hover:bg-slate-800 py-2 ${
                isActive("/admin/dashboard") ? "bg-slate-800" : ""
              }`}
            >
              <FaHome />
              <span>Dashboard</span>
            </Link>

            {/* category dropdown */}
            <div>
              <button
                onClick={() => toggleDropdown("category")}
                className="flex items-center gap-3 w-full text-left hover:text-gray-300"
              >
                <FaListAlt />
                <span>Category</span>
                <FaChevronDown
                  className={`ml-auto transition-transform ${
                    activeDropdown === "category" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeDropdown === "category" && (
                <div className="ml-8 mt-2 space-y-2">
                  <Link
                    to={"/admin/dashboard/add-category"}
                    className={`block hover:text-gray-300 hover:bg-slate-800 py-2 px-1 ${
                      isActive("/admin/dashboard/add-category")
                        ? "bg-slate-800"
                        : ""
                    }`}
                  >
                    Add Category
                  </Link>
                  <Link
                    to={`/admin/dashboard/manage-category`}
                    className={`block hover:text-gray-300 hover:bg-slate-800 py-2 px-1 ${
                      isActive("/admin/dashboard/manage-category")
                        ? "bg-slate-800"
                        : ""
                    }`}
                  >
                    Manage Category
                  </Link>
                </div>
              )}
            </div>

            {/* sub category */}
            <div>
              <button
                onClick={() => toggleDropdown("sub-category")}
                className="flex items-center gap-3 w-full text-left hover:text-gray-300"
              >
                <MdCategory />
                <span>Sub Category</span>
                <FaChevronDown
                  className={`ml-auto transition-transform ${
                    activeDropdown === "sub-category" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeDropdown === "sub-category" && (
                <div className="ml-8 mt-2 space-y-2">
                  <Link
                    to="/admin/dashboard/add-sub-category"
                    className={`block hover:text-gray-300 hover:bg-slate-800 py-2 px-1 ${
                      isActive("/admin/dashboard/add-sub-category")
                        ? "bg-slate-800"
                        : ""
                    }`}
                  >
                    Add Sub Category
                  </Link>
                  <Link
                    to={"/admin/dashboard/manage-sub-category"}
                    className={`block py-2 px-1 hover:text-gray-300 hover:bg-slate-800 ${
                      isActive("/admin/dashboard/manage-sub-category")
                        ? "bg-slate-800"
                        : ""
                    }`}
                  >
                    Manage Sub Category
                  </Link>
                </div>
              )}
            </div>

            {/* Products Dropdown */}
            <div>
              <button
                onClick={() => toggleDropdown("products")}
                className="flex items-center gap-3 w-full text-left hover:text-gray-300"
              >
                <FaProductHunt />
                <span>Products</span>
                <FaChevronDown
                  className={`ml-auto transition-transform ${
                    activeDropdown === "products" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeDropdown === "products" && (
                <div className="ml-8 mt-2 space-y-2">
                  <Link
                    to="/admin/dashboard/add-product"
                    className={`block hover:text-gray-300 hover:bg-slate-800 py-2 px-1 ${
                      isActive("/admin/dashboard/add-product")
                        ? "bg-slate-800"
                        : ""
                    }`}
                  >
                    Add Product
                  </Link>
                  <Link
                    to="/admin/dashboard/view-products"
                    className={`block hover:text-gray-300 hover:bg-slate-800 py-2 px-1 ${
                      isActive("/admin/dashboard/view-products")
                        ? "bg-slate-800"
                        : ""
                    }`}
                  >
                    View Products
                  </Link>
                </div>
              )}
            </div>

            {/* Users Dropdown */}
            <div>
              <button
                onClick={() => toggleDropdown("users")}
                className="flex items-center gap-3 w-full text-left hover:text-gray-300"
              >
                <FaUserAlt />
                <span>Users</span>
                <FaChevronDown
                  className={`ml-auto transition-transform ${
                    activeDropdown === "users" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeDropdown === "users" && (
                <div className="ml-8 mt-2 space-y-2">
                  <Link
                    to="/admin/dashboard/add-user"
                    className={`block hover:text-gray-300 hover:bg-slate-800 py-2 px-1 ${
                      isActive("/admin/dashboard/add-user")
                        ? "bg-slate-800"
                        : ""
                    }`}
                  >
                    Add User
                  </Link>
                  <Link
                    to="/admin/dashboard/manage-users"
                    className={`block hover:text-gray-300 hover:bg-slate-800 py-2 px-1 ${
                      isActive("/admin/dashboard/manage-users")
                        ? "bg-slate-800"
                        : ""
                    }`}
                  >
                    Manage Users
                  </Link>
                </div>
              )}
            </div>

            {/* Admin Dropdown */}
            <div>
              <button
                onClick={() => toggleDropdown("admin")}
                className="flex items-center gap-3 w-full text-left hover:text-gray-300"
              >
                <FaUserAlt />
                <span>Admin</span>
                <FaChevronDown
                  className={`ml-auto transition-transform ${
                    activeDropdown === "admin" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeDropdown === "admin" && (
                <div className="ml-8 mt-2 space-y-2">
                  <Link
                    to="/admin/dashboard/add-admin"
                    className={`block hover:text-gray-300 hover:bg-slate-800 py-2 px-1 ${
                      isActive("/admin/dashboard/add-admin")
                        ? "bg-slate-800"
                        : ""
                    }`}
                  >
                    Add Admin
                  </Link>
                  <Link
                    to="/admin/dashboard/manage-admin"
                    className={`block hover:text-gray-300 hover:bg-slate-800 py-2 px-1 ${
                      isActive("/admin/dashboard/manage-admin")
                        ? "bg-slate-800"
                        : ""
                    }`}
                  >
                    Manage Admin
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/admin/dashboard/orders"
              className={`flex items-center gap-3 hover:text-gray-300 hover:bg-slate-800 py-2 px-1 ${
                isActive("/admin/dashboard/orders") ? "bg-slate-800" : ""
              }`}
            >
              <FaProductHunt />
              <span>Orders</span>
            </Link>
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4">
          <button
            onClick={logoutAdminSubmit}
            className="flex items-center gap-3 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Toggle Button */}
      <button
        className="fixed top-4 right-10 z-50 lg:hidden bg-black text-white p-2 rounded-full shadow"
        onClick={() => setIsOpen(true)}
      >
        <FaBars />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
