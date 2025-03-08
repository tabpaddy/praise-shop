import { FiSearch } from "react-icons/fi";
import { useEffect } from "react";
import api from "../../../axiosInstance/api";
import { useDispatch, useSelector } from "react-redux";
import { setResult, setSearchTerm } from "../../../redux/SearchSlice";
import { useDebounce } from "use-debounce";
import { Link } from "react-router-dom";
import { FaNairaSign } from "react-icons/fa6";

export default function SearchModal({ isOpen, onClose }) {
  const { searchTerm, result } = useSelector((state) => state.search);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // 500ms delay
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (!debouncedSearchTerm) {
      dispatch(setResult([]));
      return;
    }

    const fetchSearchResults = async () => {
      try {
        const response = await api.get(
          `/api/search?query=${debouncedSearchTerm}`,
          { headers: { "Content-Type": "application/json" } }
        );
        dispatch(setResult(response.data.products));
      } catch (error) {
        console.error("Error fetching search results:", error);
        dispatch(setResult([]));
      }
    };

    fetchSearchResults();
  }, [debouncedSearchTerm, dispatch]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl mx-4 bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 ease-in-out scale-95 hover:scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="relative p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <FiSearch
            className="absolute top-1/2 left-8 transform -translate-y-1/2 text-gray-500"
            size={22}
          />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            className="w-full py-3 pl-14 pr-4 text-gray-800 bg-transparent border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600 placeholder-gray-400 font-outfit text-base transition-all duration-200"
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          />
        </div>

        {/* Results */}
        <div className={searchTerm ? "p-6 max-h-[70vh] overflow-y-auto" : ""}>
          {(!result || result.length === 0) && searchTerm ? (
            <p className="text-center text-gray-500 font-outfit text-lg italic">
              No wares found. Try a different search!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {result.map((item) => (
                <Link
                  to={`/product/${item.id}`}
                  key={item.id}
                  className="group relative block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden border border-gray-100"
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden aspect-w-4 aspect-h-3">
                    <img
                      className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                      src={item.image1_url}
                      alt={item.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <p className="text-sm font-outfit text-gray-700 truncate group-hover:text-indigo-600 transition-colors duration-200">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <FaNairaSign className="text-indigo-500 text-base" />
                      <p className="text-lg font-semibold text-gray-800 group-hover:text-indigo-500 transition-colors duration-200">
                        {new Intl.NumberFormat().format(item.price)}
                      </p>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
                    <span className="text-white font-outfit text-sm bg-indigo-500 px-3 py-1 rounded-full shadow-md">
                      View Product
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}