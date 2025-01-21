import { useState } from "react";
import { FaTimes, FaBars, FaHome, FaUserAlt, FaProductHunt } from "react-icons/fa";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false); // Sidebar toggle for mobile

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 w-64 bg-black text-white h-screen z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300`}
      >
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button className="lg:hidden text-xl" onClick={() => setIsOpen(false)}>
            <FaTimes />
          </button>
        </div>
        <nav className="space-y-4 p-4">
          <a href="#home" className="flex items-center gap-3 hover:text-gray-300">
            <FaHome />
            <span>Dashboard</span>
          </a>
          <a href="#products" className="flex items-center gap-3 hover:text-gray-300">
            <FaProductHunt />
            <span>Products</span>
          </a>
          <a href="#users" className="flex items-center gap-3 hover:text-gray-300">
            <FaUserAlt />
            <span>Users</span>
          </a>
        </nav>
      </div>

      {/* Mobile Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden bg-black text-white p-2 rounded-full shadow"
        onClick={() => setIsOpen(true)}
      >
        <FaBars />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
