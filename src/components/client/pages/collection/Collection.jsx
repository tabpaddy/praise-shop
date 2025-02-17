import axios from "axios";
import { useEffect, useState } from "react";
import { FaNairaSign } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function Collection() {
  const [collection, setCollection] = useState([]);
  const [filteredCollection, setFilteredCollection] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [visibleItems, setVisibleItems] = useState(0); // Number of items to display
  const [increment, setIncrement] = useState(0); // How many items to add per scroll
  const [loading, setLoading] = useState(false);

  // Initial Load Based on Screen Size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setVisibleItems(20);
        setIncrement(10);
      } else if (window.innerWidth >= 768) {
        setVisibleItems(15);
        setIncrement(6);
      } else {
        setVisibleItems(12);
        setIncrement(6);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const fetchCollection = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/collection", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      //console.log(response.data.collection);
      setCollection(response.data.collection);
      setFilteredCollection(response.data.collection);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error(
          "Error fetching collection:",
          error.response.data || error.message
        );
      } else {
        console.error("getting collection failed:", error);
      }
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/category", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      //console.log(response.data.categories);
      setCategory(response.data.categories);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error(
          "Error fetching category:",
          error.response.data || error.message
        );
      } else {
        console.error("getting category failed:", error);
      }
    }
  };

  const fetchSubCategory = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/sub_category",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //console.log(response.data.subCategory);
      setSubCategory(response.data.subCategory);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error(
          "Error fetching subCategory:",
          error.response.data || error.message
        );
      } else {
        console.error("getting subCategory failed:", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCategory();
      await fetchSubCategory();
      await fetchCollection();
    };

    fetchData();
  }, []);

  // Handle Category Selection
  const handleCategoryChange = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  // Handle SubCategory Selection
  const handleSubCategoryChange = (id) => {
    setSelectedSubCategories((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  // Handle Sorting
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Apply Filters & Sorting
  useEffect(() => {
    let filtered = [...collection];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((item) =>
        selectedCategories.includes(item.category_id)
      );
    }

    if (selectedSubCategories.length > 0) {
      filtered = filtered.filter((item) =>
        selectedSubCategories.includes(item.sub_category_id)
      );
    }

    // Sorting Logic
    switch (sortOption) {
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "bestseller":
        filtered.sort((a, b) => b.sold_count - a.sold_count);
        break;
      case "newest":
        filtered.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        break;
      default:
        break;
    }

    setFilteredCollection(filtered);
  }, [selectedCategories, selectedSubCategories, sortOption, collection]);

  // Infinite Scroll Handler
  const handleScroll = () => {
    if (loading) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = window.innerHeight;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setLoading(true);
      setTimeout(() => {
        setVisibleItems((prev) =>
          Math.min(prev + increment, filteredCollection.length)
        );
        setLoading(false);
      }, 1000); // Simulate network delay
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filteredCollection, loading]);

  return (
    <div className="flex flex-col md:flex-row gap-10 justify-center mt-10 px-4 md:px-10">
      {/* Sidebar Filters */}
      <div className="w-full md:w-1/4">
        <h3 className="font-outfit font-medium text-slate-900 text-2xl mb-4">
          Filters
        </h3>

        {/* Categories Filter */}
        <div className="border border-slate-300 p-4 rounded-md shadow-sm mb-4">
          <h4 className="font-outfit font-medium text-slate-800 text-lg mb-2">
            Categories
          </h4>
          {category.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                value={cat.id}
                onChange={() => handleCategoryChange(cat.id)}
                checked={selectedCategories.includes(cat.id)}
                className="accent-black"
              />
              <span className="text-slate-700">{cat.category_title}</span>
            </label>
          ))}
        </div>

        {/* Subcategories Filter */}
        <div className="border border-slate-300 p-4 rounded-md shadow-sm">
          <h4 className="font-outfit font-medium text-slate-800 text-lg mb-2">
            Type
          </h4>
          {subCategory.map((sub) => (
            <label key={sub.id} className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                value={sub.id}
                onChange={() => handleSubCategoryChange(sub.id)}
                checked={selectedSubCategories.includes(sub.id)}
                className="accent-black"
              />
              <span className="text-slate-700">{sub.sub_category_title}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="w-full md:w-3/4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div>
            <h3 className="text-slate-700 relative font-outfit font-normal text-xl sm:text-2xl lg:text-3xl">
              ALL{" "}
              <span className="text-black relative font-semibold after:hidden  after:content-[''] after:text-base after:absolute after:w-[30px] after:pt-1 after:h-[1px] after:bg-black after:top-1/2 after:left-full after:ml-2">
                COLLECTIONS
              </span>
            </h3>
          </div>
          <div className="relative">
            <select
              onChange={handleSortChange}
              className="block w-full px-4 py-2 pr-8 rounded-md border border-gray-300 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring focus:ring-gray-300 appearance-none"
            >
              <option value="" disabled selected>
                Sort by
              </option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
              <option value="bestseller">Best Seller</option>
              <option value="newest">Newest First</option>
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/*collection grid  */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 px-4 mb-32 mt-3">
          {filteredCollection.length > 0 ? (
            filteredCollection.slice(0, visibleItems).map((item) => (
              <div
                key={item.id}
                className="block font-outfit font-medium text-sm leading-2 text-left"
              >
                <Link
            to={`/product/${item.id}`}
            >
                {/* Product Image */}
                <img
                  className="object-contain shadow-sm w-full rounded-md"
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
            ))
          ) : (
            <p className="text-center col-span-full text-slate-500">
              No products match the selected filters.
            </p>
          )}
        </div>
        {/* Show loader only when loading and there are more items to load */}
        {loading && visibleItems < filteredCollection.length && (
          <div className="flex justify-center mt-4">
            <ClipLoader color="#000" size={35} />
          </div>
        )}

        {/* Show "No more items to load" when all items are loaded */}
        {!loading && visibleItems >= filteredCollection.length && (
          <p className="text-center text-gray-500 mt-4">
            No more items to load
          </p>
        )}
      </div>
    </div>
  );
}
