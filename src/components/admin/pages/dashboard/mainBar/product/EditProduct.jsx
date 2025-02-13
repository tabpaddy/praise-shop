import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminContext } from "../../../../../context/AdminContext";
import axios from "axios";
import {
  setName,
  setDescription,
  setKeyword,
  setPrice,
  setCategory,
  setSubCategory,
  setSizes,
  setBestSeller,
  setError,
  setSuccess,
  clearForm,
} from "../../../../../redux/AdminProductSlice";
import { useDispatch, useSelector } from "react-redux";

export default function EditProduct() {
  const {
    name,
    description,
    keyword,
    price,
    category,
    subCategory,
    sizes,
    bestSeller,
    error,
    success,
  } = useSelector((state) => state.adminProduct);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useContext(AdminContext);
  const [product, setProduct] = useState(null);

  const [image1File, setImage1File] = useState(null);
  const [image2File, setImage2File] = useState(null);
  const [image3File, setImage3File] = useState(null);
  const [image4File, setImage4File] = useState(null);
  const [image5File, setImage5File] = useState(null);

  const [image1Type, setImage1Type] = useState("url");
  const [image2Type, setImage2Type] = useState("url");
  const [image3Type, setImage3Type] = useState("url");
  const [image4Type, setImage4Type] = useState("url");
  const [image5Type, setImage5Type] = useState("url");

  const [image1Preview, setImage1Preview] = useState(null);
  const [image2Preview, setImage2Preview] = useState(null);
  const [image3Preview, setImage3Preview] = useState(null);
  const [image4Preview, setImage4Preview] = useState(null);
  const [image5Preview, setImage5Preview] = useState(null);

  const [manageCategory, setManageCategory] = useState([]);
  const [manageSubCategory, setManageSubCategory] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/admin/manage-product/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${admin.adminToken}`,
            },
          }
        );
        console.log(response.data.product);
        setProduct(response.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
        navigate("/admin/products"); // Redirect if error
      }
    };

    if (admin?.adminToken) {
      fetchProduct();
    }
  }, [id, admin.adminToken, navigate, dispatch]);

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
    if (product) {
      dispatch(setName(product.name));
      dispatch(setDescription(product.description));
      dispatch(setKeyword(product.keyword));
      dispatch(setPrice(product.price.toString()));
      dispatch(
        setSizes(
          typeof product.sizes === "string"
            ? JSON.parse(product.sizes)
            : product.sizes
        )
      );
      dispatch(setBestSeller(product.bestseller));
      dispatch(setCategory(product.category_id.toString()));
      dispatch(setSubCategory(product.sub_category_id.toString()));

      // Set image URLs
      setImage1File(product.image1_url);
      setImage2File(product.image2_url);
      setImage3File(product.image3_url);
      setImage4File(product.image4_url);
      setImage5File(product.image5_url);
    }
  }, [product, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchCategoryData();
      await fetchSubCategoryData();
    };

    if (admin.adminToken) {
      fetchData();
    }
  }, [admin.adminToken]);

  const handleImageChange = (
    e,
    setImageFile,
    setImagePreview,
    setImageType
  ) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Update preview immediately
      setImageType("file");
    }
  };

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
    if (!price.trim() || isNaN(price)) {
      newErrors.price = "Product Price is Required";
    }
    if (!image1File) {
      newErrors.image1File = "Image1 is Required";
    }
    if (!image2File) {
      newErrors.image2File = "Image2 is Required";
    }
    if (!image3File) {
      newErrors.image3File = "Image3 is required";
    }
    if (!image4File) {
      newErrors.image4File = "Image4 is required";
    }
    if (!image5File) {
      newErrors.image5File = "Image5 is required";
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

    const formData = new FormData();
    formData.append("_method", "PUT"); // Add this method to recongnize put for update

    // Convert to numbers where needed
    const numericCategory = parseInt(category);
    const numericSubCategory = parseInt(subCategory);

    formData.append("name", name);
    formData.append("description", description);
    formData.append("keyword", keyword);

    // price to float
    const numericPrice = parseFloat(price);
    formData.append("price", numericPrice);

    formData.append("category", numericCategory);
    formData.append("subCategory", numericSubCategory);
    sizes.forEach((size) => {
      formData.append("sizes[]", size);
    });
    formData.append("bestseller", bestSeller ? 1 : 0);
    // Append new images if provided
    if (image1Type === "file" && image1File instanceof File)
      formData.append("image1", image1File);
    if (image2Type === "file" && image2File instanceof File)
      formData.append("image2", image2File);
    if (image3Type === "file" && image3File instanceof File)
      formData.append("image3", image3File);
    if (image4Type === "file" && image4File instanceof File)
      formData.append("image4", image4File);
    if (image5Type === "file" && image5File instanceof File)
      formData.append("image5", image5File);

    // Debug formData
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }
    // console.log("Name:", name);
    // console.log("Description:", description);
    // console.log("Price:", price);
    // console.log("NumericPrice:", numericPrice);

    try {
      console.log(formData);
      const response = await axios.post(
        `http://127.0.0.1:8000/api/admin/update-product/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${admin.adminToken}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch(setSuccess(response.data.message));
        setTimeout(() => {
          dispatch(clearForm());
          navigate("/admin/dashboard/manage-product");
        }, 3000);
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const validationErrors = error.response.data.errors;
        console.error(validationErrors);
        dispatch(setError({ message: validationErrors }));
      } else {
        console.error("Update failed:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="overflow-y-auto bg-slate-200 font-outfit p-4">
      <div className="text-left my-2 mt-10">
        <h3 className="text-slate-700 relative font-prata font-normal text-2xl sm:text-3xl">
          Edit Product
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
              type="number"
              className={`p-2 my-1 w-full border-2 rounded ${
                error.price ? "border-red-500" : "border-slate-900"
              }`}
              value={price}
              onChange={(e) => {
                dispatch(setPrice(e.target.value));
                dispatch(setError({ ...error, price: "" }));
              }}
              placeholder="Product Price"
              step={"0.01"}
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
            {image1File && (
              <img
                className="rounded-md object-contain w-1/2 my-3 shadow-md"
                src={
                  image1Type === "file" ? image1Preview : product?.image1_url
                }
                alt={name}
              />
            )}

            <input
              type="file"
              placeholder="Product image1"
              className={`${
                error.image1 ? "border-red-500" : "border-slate-900"
              } p-2 my-1 w-full border-2 rounded`}
              onChange={(e) => {
                handleImageChange(
                  e,
                  setImage1File,
                  setImage1Preview,
                  setImage1Type
                );
                dispatch(setError({ ...error, image1File: "" }));
              }}
            />
            {error.image1File && (
              <span className="text-sm text-red-500">{error.image1File}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="" className="text-slate-700 font-normal text-xl">
              Product image2
            </label>
            <img
              className="rounded-md object-contain w-1/2 my-3 shadow-md"
              src={image2Type === "file" ? image2Preview : product?.image2_url}
              alt={name}
            />
            <input
              type="file"
              placeholder="Product image2"
              className={`${
                error.image2 ? "border-red-500" : "border-slate-900"
              } p-2 my-1 w-full border-2 rounded`}
              onChange={(e) => {
                handleImageChange(
                  e,
                  setImage2File,
                  setImage2Preview,
                  setImage2Type
                );
                dispatch(setError({ ...error, image2File: "" }));
              }}
            />
            {error.image2File && (
              <span className="text-sm text-red-500">{error.image2File}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="" className="text-slate-700 font-normal text-xl">
              Product image3
            </label>
            <img
              className="rounded-md object-contain w-1/2 my-3 shadow-md"
              src={image3Type === "file" ? image3Preview : product?.image3_url}
              alt={name}
            />
            <input
              type="file"
              placeholder="Product image3"
              className={`${
                error.image3 ? "border-red-500" : "border-slate-900"
              } p-2 my-1 w-full border-2 rounded`}
              onChange={(e) => {
                handleImageChange(
                  e,
                  setImage3File,
                  setImage3Preview,
                  setImage3Type
                );
                dispatch(setError({ ...error, image3File: "" }));
              }}
            />
            {error.image3File && (
              <span className="text-sm text-red-500">{error.image3File}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="" className="text-slate-700 font-normal text-xl">
              Product image4
            </label>
            <img
              className="rounded-md object-contain w-1/2 my-3 shadow-md"
              src={image4Type === "file" ? image4Preview : product?.image4_url}
              alt={name}
            />
            <input
              type="file"
              className={`${
                error.image4 ? "border-red-500" : "border-slate-900"
              } p-2 my-1 w-full border-2 rounded`}
              onChange={(e) => {
                handleImageChange(
                  e,
                  setImage4File,
                  setImage4Preview,
                  setImage4Type
                );
                dispatch(setError({ ...error, image4File: "" }));
              }}
            />
            {error.image4File && (
              <span className="text-sm text-red-500">{error.image4File}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="" className="text-slate-700 font-normal text-xl">
              Product image5
            </label>
            <img
              className="rounded-md object-contain w-1/2 my-3 shadow-md"
              src={image5Type === "file" ? image5Preview : product?.image5_url}
              alt={name}
            />
            <input
              type="file"
              className={`${
                error.image5 ? "border-red-500" : "border-slate-900"
              } p-2 my-1 w-full border-2 rounded`}
              onChange={(e) => {
                handleImageChange(
                  e,
                  setImage5File,
                  setImage5Preview,
                  setImage5Type
                );
                dispatch(setError({ ...error, image5File: "" }));
              }}
            />
            {error.image5File && (
              <span className="text-sm text-red-500">{error.image5File}</span>
            )}
          </div>
          <div className="mb-4">
            <select
              className={`p-2 my-1 w-full border-2 rounded ${
                error.category ? "border-red-500" : "border-slate-900"
              }`}
              value={category}
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
              value={subCategory}
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
          {/* success and error */}
          <div className="mb-4 flex justify-center">
            {error.message && typeof error.message === "object" ? (
              Object.values(error.message).map((err, index) => (
                <span key={index} className="text-sm text-red-500 block">
                  {err}
                </span>
              ))
            ) : (
              <span className="text-sm text-red-500">{error.message}</span>
            )}
            {error.error && (
              <span className="text-sm text-red-500">{error.error}</span>
            )}
            {success && (
              <span className="text-sm text-green-500">{success}</span>
            )}
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
