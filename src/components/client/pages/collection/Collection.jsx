import axios from "axios";
import { useEffect, useState } from "react";
import { FaNairaSign } from "react-icons/fa6";

export default function Collection() {
  const [collection, setCollection] = useState([]);
  const [filteredCollection, setFilteredCollection] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [sortOption, setSortOption] = useState("");

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
      console.log(response.data.subCategory);
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

    if (sortOption === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "bestseller") {
      filtered.sort((a, b) => b.sold_count - a.sold_count);
    }

    setFilteredCollection(filtered);
  }, [selectedCategories, selectedSubCategories, sortOption, collection]);

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
          <div className="border border-slate-200 p-2 rounded-md shadow-sm">
            <select
              onChange={handleSortChange}
              className="outline-none bg-transparent text-slate-800"
            >
              <option value="" className="text-slate-400">
                <span>Sort by: </span>Price: High to Low
              </option>
              <option value="price-high">
                <span>Sort by: </span>Price: High to Low
              </option>
              <option value="price-low">
                <span>Sort by: </span>Price: Low to High
              </option>
              <option value="bestseller">
                <span>Sort by: </span>Best Seller
              </option>
            </select>
          </div>
        </div>

        {/*collection grid  */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 px-4 mb-32 mt-3">
          {filteredCollection.length > 0 ? (
            filteredCollection.map((item) => (
              <div
                key={item.id}
                className="block font-outfit font-medium text-sm leading-2 text-left"
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
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-slate-500">
              No products match the selected filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
