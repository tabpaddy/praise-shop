import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../../../context/AdminContext";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setName,
  setDescription,
  setKeyword,
  setPrice,
  setImage1,
  setImage2,
  setImage3,
  setImage4,
  setImage5,
  setCategory,
  setSubCategory,
  setSizes,
  setBestSeller,
  setError,
  setSuccess,
  clearForm,
} from "../../../../../redux/AdminProductSlice";

export default function AddProduct() {
  const [manageCategory, setManageCategory] = useState([]);
  const [manageSubCategory, setManageSubCategory] = useState([]);

  const {
    name,
    description,
    keyword,
    price,
    image1,
    image2,
    image3,
    image4,
    image5,
    category,
    subCategory,
    sizes,
    bestSeller,
    error,
    success,
  } = useSelector((state) => state.adminProduct);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { admin } = useContext(AdminContext);

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/manage-category",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${admin.adminToken}`,
          },
        }
      );
      setManageCategory(response.data.categories);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error(
          "Error fetching categories:",
          error.response.data || error.message
        );
      } else {
        console.error("getting category failed:", error);
      }
    }
  };

  const fetchSubCategoryData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/manage-sub-category",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${admin.adminToken}`,
          },
        }
      );
      setManageSubCategory(response.data.sub_categories);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error(
          "Error fetching subCategories:",
          error.response.data || error.message
        );
      } else {
        console.error("getting subCategory failed:", error);
      }
    }
  };

  useEffect(() => {
    fetchCategoryData();
    fetchSubCategoryData();
  }, [admin.adminToken]);

  if (!admin || !admin.adminToken) {
    console.error("admin token is missing");
    return;
  }

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Product Name is Required";
    }
    if (!description.trim()) {
      newErrors.description = "Product Description is Required";
    }
    if (!keyword.trim()) {
      newErrors.keyword = "Product Keyword is Required";
    }
    if (!price.trim()) {
      newErrors.price = "Product Price is Required";
    }
    if (!image1) {
      newErrors.image1 = "Image1 is Required";
    }
    if (!image2) {
      newErrors.image2 = "Image2 is Required";
    }
    if (!image3) {
      newErrors.image3 = "Image3 is required";
    }
    if (!image4) {
      newErrors.image4 = "Image4 is required";
    }
    if (!image5) {
      newErrors.image5 = "Image5 is required";
    }
    if (!category.trim()) {
      newErrors.category = "Select a Category";
    }
    if (!subCategory.trim()) {
      newErrors.subCategory = "Select a SubCategory";
    }
    if (!sizes || sizes.length === 0) {
      newErrors.sizes = "Please select at least one size.";
    }
    dispatch(setError(newErrors));
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

     // Create a FormData object to handle file uploads.
     const formData = new FormData();
     formData.append("name", name);
     formData.append("description", description);
     formData.append("keyword", keyword);
     formData.append("price", price);
     formData.append("category", category);
     formData.append("subCategory", subCategory);
     // Append sizes as a JSON string (or handle on backend as you wish)
     formData.append("sizes", JSON.stringify(sizes));
     formData.append("bestSeller", bestSeller);
     // Append file objects (image1 - image5) from file inputs.
     formData.append("image1", image1);
     formData.append("image2", image2);
     formData.append("image3", image3);
     formData.append("image4", image4);
     formData.append("image5", image5);
     
  };
  return (
    <div className="overflow-y-auto bg-slate-200 font-outfit p-4">
      <div className="text-center my-2 mt-10">
        <h3 className="text-slate-700 relative font-prata font-normal text-2xl sm:text-3xl">
          Create{" "}
          <span className="relative after:content-[''] after:absolute after:w-[50px] after:pt-1 after:h-[0.5] after:bg-black after:left-full after:top-1/2 after:ml-2">
            Product
          </span>
        </h3>
      </div>
      <div className="flex justify-center items-center my-8 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md mx-auto font-outfit"
        >
          <div className="mb-4">
            <input
              type="text"
              className={`p-2 my-1 w-full border-2 rounded ${
                error.name ? "border-red-500" : "border-slate-900"
              }`}
              placeholder="Product name"
              value={name}
              onChange={(e) => {
                dispatch(setName(e.target.value));
                dispatch(setError({ ...error, name: "" }));
              }}
            />
            {error.name && (
              <span className="text-sm text-red-500">{error.name}</span>
            )}
          </div>
          <div className="mb-4">
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Product description"
              className={`p-2 my-1 w-full border-2 rounded ${
                error.description ? "border-red-500" : "border-slate-900"
              }`}
              value={description}
              onChange={(e) => {
                dispatch(setDescription(e.target.value));
                dispatch(setError({ ...error, description: "" }));
              }}
            ></textarea>
            {error.description && (
              <span className="text-sm text-red-500">{error.description}</span>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              className={`p-2 my-1 w-full border-2 rounded ${
                error.keyword ? "border-red-500" : "border-slate-900"
              }`}
              value={keyword}
              onChange={(e) => {
                dispatch(setKeyword(e.target.value));
                dispatch(setError({ ...error, keyword: "" }));
              }}
              placeholder="Product keyword"
            />
            {error.keyword && (
              <span className="text-sm text-red-500">{error.keyword}</span>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              className={`p-2 my-1 w-full border-2 rounded ${
                error.price ? "border-red-500" : "border-slate-900"
              }`}
              value={price}
              onChange={(e) => {
                dispatch(setPrice(e.target.value));
                dispatch(setError({ ...error, price: "" }));
              }}
              placeholder="Product Price"
            />
            {error.price && (
              <span className="text-sm text-red-500">{error.price}</span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor=""
              className="font-outfit text-slate-700 font-normal text-xl"
            >
              Product image1
            </label>
            <input
              type="file"
              placeholder="Product image1"
              className={`${
                error.image1 ? "border-red-500" : "border-slate-900"
              } p-2 my-1 w-full border-2 rounded`}
              onChange={(e) => {
                dispatch(setImage1(e.target.files[0]));
                dispatch(setError({ ...error, image1: "" }));
              }}
            />
            {error.image1 && (
              <span className="text-sm text-red-500">{error.image1}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="" className="text-slate-700 font-normal text-xl">
              Product image2
            </label>
            <input
              type="file"
              placeholder="Product image2"
              className={`${
                error.image2 ? "border-red-500" : "border-slate-900"
              } p-2 my-1 w-full border-2 rounded`}
              onChange={(e) => {
                dispatch(setImage2(e.target.files[0]));
                dispatch(setError({ ...error, image2: "" }));
              }}
            />
            {error.image2 && (
              <span className="text-sm text-red-500">{error.image2}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="" className="text-slate-700 font-normal text-xl">
              Product image3
            </label>
            <input
              type="file"
              placeholder="Product image3"
              className={`${
                error.image3 ? "border-red-500" : "border-slate-900"
              } p-2 my-1 w-full border-2 rounded`}
              onChange={(e) => {
                dispatch(setImage3(e.target.files[0]));
                dispatch(setError({ ...error, image3: "" }));
              }}
            />
            {error.image3 && (
              <span className="text-sm text-red-500">{error.image3}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="" className="text-slate-700 font-normal text-xl">
              Product image4
            </label>
            <input
              type="file"
              className={`${
                error.image4 ? "border-red-500" : "border-slate-900"
              } p-2 my-1 w-full border-2 rounded`}
              onChange={(e) => {
                dispatch(setImage4(e.target.files[0]));
                dispatch(setError({ ...error, image4: "" }));
              }}
            />
            {error.image4 && (
              <span className="text-sm text-red-500">{error.image4}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="" className="text-slate-700 font-normal text-xl">
              Product image5
            </label>
            <input
              type="file"
              className={`${
                error.image5 ? "border-red-500" : "border-slate-900"
              } p-2 my-1 w-full border-2 rounded`}
              onChange={(e) => {
                dispatch(setImage5(e.target.files[0]));
                dispatch(setError({ ...error, image5: "" }));
              }}
            />
            {error.image5 && (
              <span className="text-sm text-red-500">{error.image5}</span>
            )}
          </div>
          <div className="mb-4">
            <select
              className={`p-2 my-1 w-full border-2 rounded ${
                error.category ? "border-red-500" : "border-slate-900"
              }`}
              onChange={(e) => {
                dispatch(setCategory(e.target.value));
                dispatch(setError({ ...error, category: "" }));
              }}
            >
              <option value="">Select a Category</option>
              {Array.isArray(manageCategory) &&
                manageCategory.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.category_title}
                    </option>
                  );
                })}
            </select>
            {error.category && (
              <span className="text-sm text-red-500">{error.category}</span>
            )}
          </div>
          <div className="mb-4">
            <select
              className={`p-2 my-1 w-full border-2 rounded ${
                error.subCategory ? "border-red-500" : "border-slate-900"
              }`}
              onChange={(e) => {
                dispatch(setSubCategory(e.target.value));
                dispatch(setError({ ...error, subCategory: "" }));
              }}
            >
              <option value="">Select a Sub-Category</option>
              {Array.isArray(manageSubCategory) &&
                manageSubCategory.map((subCategory) => {
                  return (
                    <option key={subCategory.id} value={subCategory.id}>
                      {subCategory.sub_category_title}
                    </option>
                  );
                })}
            </select>
            {error.subCategory && (
              <span className="text-sm text-red-500">{error.subCategory}</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-slate-700 font-normal text-xl mb-2">
              Select Sizes
            </label>
            <div className="flex flex-wrap gap-4">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <label key={size} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    value={size}
                    checked={sizes.includes(size)}
                    onChange={(e) => {
                      let newSizes = [...sizes];
                      if (e.target.checked) {
                        newSizes.push(size);
                      } else {
                        newSizes = newSizes.filter((s) => s !== size);
                      }
                      dispatch(setSizes(newSizes));
                      dispatch(setError({ ...error, sizes: [] }));
                    }}
                    className="form-checkbox"
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
            {error.sizes && (
              <span className="text-sm text-red-500">{error.sizes}</span>
            )}
          </div>
          <div className="mb-4 flex justify-start gap-2">
            <label className="text-slate-700 font-normal text-xl">
              Best Seller:
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={bestSeller}
                onChange={(e) => dispatch(setBestSeller(e.target.checked))}
              />
              Mark as Bestseller
            </label>
          </div>
          <div className="text-center">
            <input
              type="submit"
              value={isLoading ? "Loading..." : "Submit"}
              className={`${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              } text-sm font-outfit font-light text-white bg-black p-3 px-9 rounded hover:bg-gray-800 hover:text-slate-300`}
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
