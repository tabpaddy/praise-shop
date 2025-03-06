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

  // fetch result from the server
  useEffect(() => {
    if (!debouncedSearchTerm) {
      dispatch(setResult([]));
      return;
    }

    const fetchSearchResults = async (debouncedSearchTerm) => {
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
      className="fixed inset-0 z-50 backdrop-blur-md bg-black/30"
      onClick={onClose} // Close modal when clicking outside
    >
      <div
        className="absolute top-[5rem] left-1/2 transform -translate-x-1/2 w-full max-w-[90%] sm:max-w-[80%] md:max-w-[50%] lg:max-w-[60%] xl:max-w-[60%] px-4 sm:px-8"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="relative">
          <FiSearch
            className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            className="w-full p-3 pl-10 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-0 text-sm bg-white"
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          />
        </div>

        {/* Results */}
        {(!result || result.length === 0) && searchTerm ? (
          <p className="text-stone-700">No results found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {result.map((item) => (
              <div
              key={item.id}
              className="block font-outfit font-medium text-sm leading-2 text-left"
            >
              <Link to={`/product/${item.id}`}>
                {/* Product Image */}
                <img
                  className="object-cover shadow-sm w-full h-32 rounded-md"
                  src={item.image1_url}
                  alt={item.name}
                />
  
                {/* Product Name */}
                <p className="text-xs my-1">{item.name}</p>
  
                {/* Price Section */}
                <div className="flex items-center justify-left gap-1 text-lg font-semibold text-slate-800">
                  <FaNairaSign className="text-base" />
                  <p>{item.price}</p>
                </div>
              </Link>
            </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
