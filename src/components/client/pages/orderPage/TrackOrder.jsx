import { useEffect } from "react";
import { motion } from "framer-motion"; // For animations
import {
  FaTruck,
  FaMapMarkerAlt,
  FaCreditCard,
  FaBoxOpen,
} from "react-icons/fa";

export default function TrackOrder({
  modalOpen,
  modalClose,
  first_name,
  last_name,
  email,
  phone,
  city,
  state,
  zip_code,
  country,
  address,
  invoice_no,
  payment_method,
  payment_status,
  order_status,
  total_price,
}) {
  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        modalClose();
      }
    };
    if (modalOpen) {
      document.addEventListener("keydown", handleKeydown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeydown); // Fixed typo: "Keydown" → "keydown"
    };
  }, [modalOpen, modalClose]);

  if (!modalOpen) return null;

  // Assuming deliveryInformation is an array with one object
  //   const delivery = deliveryInformation || {};
  //   console.log(delivery);
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={modalClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl bg-white rounded-xl shadow-2xl p-6 md:p-8 lg:p-10 mx-auto overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-stone-800 flex items-center gap-2">
            <FaTruck className="text-indigo-600" /> Track Your Order
          </h1>
          <button
            className="text-stone-600 hover:text-stone-800 transition-colors"
            onClick={modalClose}
            aria-label="Close Modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 md:h-8 md:w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Delivery Information */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg md:text-xl font-semibold text-stone-800 flex items-center gap-2 mb-3">
              <FaMapMarkerAlt className="text-indigo-500" /> Delivery Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm md:text-base">
              <p>
                <span className="font-medium text-stone-700">Name: </span>
                {first_name} {last_name}
              </p>
              <p>
                <span className="font-medium text-stone-700">Email: </span>
                {email}
              </p>
              <p className="sm:col-span-2">
                <span className="font-medium text-stone-700">Address: </span>
                {address}, {city}, {state} State, {zip_code}, {country}
              </p>
              <p>
                <span className="font-medium text-stone-700">Phone: </span>
                {phone}
              </p>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg md:text-xl font-semibold text-stone-800 flex items-center gap-2 mb-3">
              <FaBoxOpen className="text-indigo-500" /> Order Summary
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm md:text-base">
              <p>
                <span className="font-medium text-stone-700">Invoice No: </span>
                {invoice_no}
              </p>
              <p>
                <span className="font-medium text-stone-700">
                  Payment Method:{" "}
                </span>
                {payment_method.charAt(0).toUpperCase() +
                  payment_method.slice(1)}
              </p>
              <p>
                <span className="font-medium text-stone-700">
                  Payment Status:{" "}
                </span>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs md:text-sm ${
                    payment_status === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {payment_status.charAt(0).toUpperCase() +
                    payment_status.slice(1)}
                </span>
              </p>
              <p>
                <span className="font-medium text-stone-700">
                  Order Status:{" "}
                </span>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs md:text-sm ${
                    order_status === "shipped"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {order_status.charAt(0).toUpperCase() + order_status.slice(1)}
                </span>
              </p>
              <p className="sm:col-span-2">
                <span className="font-medium text-stone-700">
                  Total Price:{" "}
                </span>
                ₦
                {Number(total_price).toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>

          {/* Creative Progress Tracker */}
          <div className="mt-6">
            <h2 className="text-lg md:text-xl font-semibold text-stone-800 mb-4">
              Order Progress
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <span className="text-sm md:text-base text-stone-700">
                  Order Placed
                </span>
              </div>
              <div className="w-full sm:w-1/4 h-1 bg-gray-200 relative">
                <div
                  className={`absolute top-0 left-0 h-full bg-indigo-500 transition-all duration-500 ${
                    order_status !== "pending" ? "w-full" : "w-0"
                  }`}
                ></div>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    order_status !== "pending" ? "bg-indigo-500" : "bg-gray-300"
                  }`}
                >
                  2
                </div>
                <span className="text-sm md:text-base text-stone-700">
                  Processing
                </span>
              </div>
              <div className="w-full sm:w-1/4 h-1 bg-gray-200 relative">
                <div
                  className={`absolute top-0 left-0 h-full bg-indigo-500 transition-all duration-500 ${
                    order_status === "shipped" ? "w-full" : "w-0"
                  }`}
                ></div>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    order_status === "shipped" ? "bg-indigo-500" : "bg-gray-300"
                  }`}
                >
                  3
                </div>
                <span className="text-sm md:text-base text-stone-700">
                  Shipped
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
