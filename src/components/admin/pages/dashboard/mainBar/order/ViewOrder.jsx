import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTruck, FaCheckCircle, FaSyncAlt } from "react-icons/fa";
import api from "../../../../../axiosInstance/api";
import { AdminContext } from "../../../../../context/AdminContext";

export default function ViewOrder({
  modalOpen,
  modalClose,
  first_name,
  last_name,
  phone,
  street,
  email,
  city,
  country,
  zip_code,
  state,
  username,
  invoice_no,
  amount,
  payment_method,
  payment_status,  
  payment_reference,
  order_status, 
  order_date,
  items, // Default to empty array if undefined
}) {
  // Local state to manage status changes
  const [orderStatus, setOrderStatus] = useState(order_status);
  const [paymentStatus, setPaymentStatus] = useState(payment_status);
  const [isLoading, setIsLoading] = useState(false);
  const { admin } = useContext(AdminContext);
  const headers = { Authorization: `Bearer ${admin?.adminToken}` }; // Ensure admin is defined

  // Sync state with props when they change
  useEffect(() => {
    setOrderStatus(order_status);
    setPaymentStatus(payment_status);
  }, [order_status, payment_status]);

  // Debug initial props and state
  useEffect(() => {
    console.log("Props - Order Status:", order_status);
    console.log("Props - Payment Status:", payment_status);
    console.log("State - Order Status:", orderStatus);
    console.log("State - Payment Status:", paymentStatus);
    console.log("Items:", items);
    console.log("Order Date:", order_date);
  }, [order_status, payment_status, orderStatus, paymentStatus, items, order_date]);

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
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [modalOpen, modalClose]);

  // Function to update order status
  const handleUpdateOrderStatus = async () => {
    if (orderStatus === "shipped") return;
    setIsLoading(true);
    try {
      const response = await api.post(
        `/api/admin/orders/status`,
        {
          order_status: "shipped",
          invoice_no: invoice_no,
        },
        { headers } // Pass headers as an object
      );
      if (response.status === 200) {
        setOrderStatus("shipped");
        alert("Order status updated to 'shipped' successfully!");
      }
    } catch (error) {
      console.error("Failed to update order status:", error);
      alert("Failed to update order status. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to update payment status for COD
  const handleUpdatePaymentStatus = async () => {
    if (payment_method !== "cod" || paymentStatus === "paid") return;
    setIsLoading(true);
    try {
      const response = await api.post(
        `/api/admin/orders/payment`,
        {
          payment_status: "paid",
          invoice_no: invoice_no,
        },
        { headers }
      );
      if (response.status === 200) {
        setPaymentStatus("paid");
        alert("Payment status updated to 'paid' successfully!");
      }
    } catch (error) {
      console.error("Failed to update payment status:", error);
      alert("Failed to update payment status. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!modalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={modalClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl bg-white rounded-xl shadow-2xl p-4 sm:p-6 md:p-8 mx-auto overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-stone-800 flex items-center gap-2">
            <FaTruck className="text-indigo-600" /> Admin: View Order
          </h1>
          <button
            className="text-stone-600 hover:text-stone-800 transition-colors"
            onClick={modalClose}
            aria-label="Close Modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"
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

        {/* Order Details */}
        <div className="space-y-4 sm:space-y-6">
          {/* Customer Information */}
          <div className="bg-indigo-50 p-3 sm:p-4 rounded-lg">
            <h2 className="text-base sm:text-lg font-semibold text-stone-800 mb-2">
              Customer Details
            </h2>
            <div className="text-xs sm:text-sm space-y-1">
              <p>
                <span className="font-medium">Name:</span> {first_name}{" "}
                {last_name}
              </p>
              <p>
                <span className="font-medium">Username:</span>{" "}
                {username || "N/A"}
              </p>
              <p>
                <span className="font-medium">Email:</span> {email}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {phone}
              </p>
              <p>
                <span className="font-medium">Address:</span> {street}, {city},{" "}
                {state}, {zip_code}, {country}
              </p>
            </div>
          </div>

          {/* Order Information */}
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <h2 className="text-base sm:text-lg font-semibold text-stone-800 mb-2">
              Order Details
            </h2>
            <div className="text-xs sm:text-sm space-y-1">
              <p>
                <span className="font-medium">Invoice No:</span> {invoice_no}
              </p>
              <p>
                <span className="font-medium">Amount:</span> ₦
                {Number(amount).toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Order Date:</span>{" "}
                {order_date ? new Date(order_date).toLocaleDateString() : "N/A"}
              </p>
              <p>
                <span className="font-medium">Payment Method:</span>{" "}
                {payment_method.charAt(0).toUpperCase() +
                  payment_method.slice(1)}
              </p>
              {payment_reference && (
                <p>
                  <span className="font-medium">Payment Reference:</span>{" "}
                  {payment_reference}
                </p>
              )}
              <div className="flex items-center gap-2">
                <span className="font-medium">Payment Status:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    paymentStatus === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {paymentStatus
                    ? paymentStatus.charAt(0).toUpperCase() +
                      paymentStatus.slice(1)
                    : "N/A"}
                </span>
                {payment_method === "cod" && paymentStatus === "pending" && (
                  <button
                    onClick={handleUpdatePaymentStatus}
                    disabled={isLoading}
                    className="flex items-center gap-1 text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-2 py-1 rounded-md transition disabled:opacity-50"
                  >
                    {isLoading ? (
                      <FaSyncAlt className="animate-spin" />
                    ) : (
                      <FaCheckCircle />
                    )}
                    Mark as Paid
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Order Status:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    orderStatus === "shipped"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {orderStatus
                    ? orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1)
                    : "N/A"}
                </span>
                {orderStatus === "processing" && (
                  <button
                    onClick={handleUpdateOrderStatus}
                    disabled={isLoading}
                    className="flex items-center gap-1 text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-2 py-1 rounded-md transition disabled:opacity-50"
                  >
                    {isLoading ? (
                      <FaSyncAlt className="animate-spin" />
                    ) : (
                      <FaCheckCircle />
                    )}
                    Mark as Shipped
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <h2 className="text-base sm:text-lg font-semibold text-stone-800 mb-2">
              Order Items
            </h2>
            {items.length === 0 ? (
              <p className="text-xs sm:text-sm text-stone-600">
                No items found.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 font-medium">Product</th>
                      <th className="p-2 font-medium">Image</th>
                      <th className="p-2 font-medium">Size</th>
                      <th className="p-2 font-medium">Price</th>
                      <th className="p-2 font-medium">Quantity</th>
                      <th className="p-2 font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">{item.name || "N/A"}</td>
                        <td className="p-2">
                          <img
                            className="object-contain shadow-md rounded-md h-16 sm:h-20 md:h-24 lg:h-28"
                            src={item.image1_url}
                            alt={item.name}
                          />
                        </td>
                        <td className="p-2">{item.size || "N/A"}</td>
                        <td className="p-2">
                          ₦{Number(item.price).toLocaleString()}
                        </td>
                        <td className="p-2">{item.quantity || 1}</td>
                        <td className="p-2">
                          ₦
                          {Number(
                            item.price * (item.quantity || 1)
                          ).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
