import { useContext, useEffect, useState } from "react";
import { FaNairaSign } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import RelatedProduct from "./RelatedProduct";
import { HiArrowsRightLeft, HiShieldCheck, HiTruck } from "react-icons/hi2";
import ProductReview from "./ProductReview";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../redux/CartSlice";
import AlertModal from "./alertModal";
import { UserContext } from "../../../context/UserContext";
import api from "../../../axiosInstance/api"; // import api instance
import axios from "axios";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [alertModal, setAlertModal] = useState(false);
  const [message, setMessage] = useState("");

  const { user } = useContext(UserContext);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/api/single-product/${id}`);
      //console.log(response.data.product);
      setProduct(response.data.product);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("Error fetching product:", error.response.data);
      } else {
        console.error("getting product failed:", error);
        navigate("/"); //redirect to home
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchProduct();
    };

    fetchData();
  }, [id]);

  //   select size
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  // Fetch CSRF token before sending requests
  const fetchCsrfToken = async () => {
    try {
      // Add fresh: true to force new CSRF token
      await api.get("/sanctum/csrf-cookie");
      console.log("CSRF cookies:", document.cookie);
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSize) {
      setAlertModal(true);
      setMessage("Please select a size before adding to cart.");
      return;
    }

    if (
      cart?.some((item) => item.id === product.id && item.size === selectedSize)
    ) {
      setAlertModal(true);
      setMessage("Product already in cart");
      return;
    }

    // Add to Redux & Local Storage for guest users
    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        image: product.image1_url,
      })
    );

    // API call only if user is logged in

    try {
      await fetchCsrfToken(); // Fetch CSRF token before making the API request
      console.log("CSRF Cookie:", document.cookie);

      const response = await api.post(
        "/api/add-to-cart",
        { product_id: product.id, size: selectedSize },
        {
          headers: {
            Authorization: user ? `Bearer ${user?.userToken}` : "",
          },
        }
      );

      if (response.status === 200) console.log(response.data);
    } catch (error) {
      console.error("Error details:", {
        status: error.response?.status,
        headers: error.response?.headers,
        data: error.response?.data,
        cookies: document.cookie,
      });
    }
  };

  return (
    <div className="my-8 font-outfit px-4">
      {product && (
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Image Gallery */}
          <div className="w-full lg:w-[55%] flex flex-col sm:flex-row gap-4 sm:gap-6">
            {/* Main Image - On top for mobile, side-by-side for larger screens */}
            <div className="flex-1 order-1 sm:order-2">
              <img
                src={product.image1_url}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg shadow-md border max-h-[500px] sm:max-h-[600px]"
              />
            </div>

            {/* Thumbnails - Horizontal on mobile, vertical on larger screens */}
            <div className="flex flex-row sm:flex-col w-full sm:w-[120px] gap-2 sm:gap-4 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 order-2 sm:order-1">
              {[
                product.image2_url,
                product.image3_url,
                product.image4_url,
                product.image5_url,
              ]
                .filter(Boolean)
                .map((img, index) => (
                  <div
                    key={index}
                    className="w-[95px] sm:w-full aspect-square flex-shrink-0"
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover border rounded-sm cursor-pointer hover:opacity-85 transition-opacity"
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-[45%] lg:pl-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-stone-900">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 text-2xl md:text-3xl font-semibold text-stone-800 mb-6">
              <FaNairaSign className="text-lg md:text-xl" />
              <p>{new Intl.NumberFormat().format(product.price)}</p>
            </div>

            <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-lg md:text-xl font-semibold mb-4 text-stone-700">
                Select Size
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes?.length > 0 ? (
                  product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`px-4 py-2.5 border-2 rounded-md text-sm md:text-base transition-all ${
                        selectedSize === size
                          ? "bg-stone-800 text-white border-stone-800"
                          : "bg-white text-stone-700 hover:border-yellow-500"
                      }`}
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size}
                    </button>
                  ))
                ) : (
                  <p className="text-red-500">Currently unavailable in sizes</p>
                )}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-3.5 bg-stone-900 text-white text-lg font-semibold rounded-md hover:bg-stone-800 transition-colors"
            >
              Add to Cart
            </button>

            <div className="mt-8 pt-6 border-t border-stone-200">
              <div className="space-y-3 text-stone-600 text-sm md:text-base">
                <p className="flex items-center gap-2">
                  <HiShieldCheck className="text-green-600 text-lg" />
                  100% Authentic Products
                </p>
                <p className="flex items-center gap-2">
                  <HiArrowsRightLeft className="text-blue-600 text-lg" />
                  Easy Returns & Exchanges
                </p>
                <p className="flex items-center gap-2">
                  <HiTruck className="text-purple-600 text-lg" />
                  Free Shipping on Orders Over ₦50k
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <ProductReview />
      <div>
        <RelatedProduct />
      </div>

      <AlertModal
        modalOpen={alertModal}
        modalClose={() => setAlertModal(false)}
        message={message}
      />
    </div>
  );
}
