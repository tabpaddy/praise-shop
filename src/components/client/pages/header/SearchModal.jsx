import { FiSearch } from "react-icons/fi";
import { useEffect } from "react";

export default function SearchModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeydown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 backdrop-blur-md bg-black/30"
      onClick={onClose} // Close modal when clicking outside
    >
      <div
        className="absolute top-[5rem] left-1/2 transform -translate-x-1/2 w-full max-w-[90%] sm:max-w-[80%] md:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%] px-4 sm:px-8"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="relative">
          <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-0 text-sm bg-white"
          />
        </div>
      </div>
    </div>
  );
}
