import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UserContext } from "../../../context/UserContext";
import { clearCart } from "../../../redux/CartSlice";
import api from "../../../axiosInstance/api";
import { Link, useLocation } from "react-router-dom";
import { FaNairaSign } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";
import TrackOrder from "./TrackOrder";

export default function Order() {
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [trackOrder, setTrackOrder] = useState(false);
  const [trackOrderDetails, setTrackOrderDetails] = useState({});

  useEffect(() => {
    if (!user) return;

    const queryParams = new URLSearchParams(location.search);
    const paymentSuccess = queryParams.get("payment") === "success";

    const fetchOrders = async () => {
      try {
        const headers = { Authorization: `Bearer ${user.userToken}` };
        const response = await api.get("/api/user-order", {
          headers,
          withCredentials: true,
        });
        setOrders(response.data.orders || []);
        // console.log("Orders:", response.data.orders);
        if (paymentSuccess) {
          dispatch(clearCart());
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, dispatch, location]);

  const calculateItemTotal = (item) => {
    return (parseFloat(item.price) || 0) * (item.quantity || 1);
  };

  const TrackOrderClick = (order) => {
    const delivery = order.delivery_information || {};
    setTrackOrder(true);
    setTrackOrderDetails([
      delivery.first_name || "N/A",
      delivery.last_name || "N/A",
      delivery.phone || "N/A",
      delivery.email || "N/A",
      delivery.street || "N/A",
      order.invoice_no || "N/A",
      order.payment_method || "N/A",
      order.payment_status || "N/A",
      order.order_status || "N/A",
      order.amount || 0,
      delivery.city || "N/A",
      delivery.country || "N/A",
      delivery.zip_code || "N/A",
      delivery.state || "N/A",
    ]);
  };

  return (
    <div className={orders.length === 0 ? "mb-16 md:mb-64 lg:mb-96" : "mb-8"}>
      {/* Header */}
      <div className="text-left my-3 mt-8 px-4 sm:px-6">
        <h3 className="text-slate-700 font-outfit font-normal text-xl sm:text-2xl md:text-3xl">
          Your{" "}
          <span className="text-black font-semibold relative after:content-[''] after:absolute after:w-6 sm:after:w-8 after:h-px after:bg-black after:top-1/2 after:left-full after:ml-1 sm:after:ml-2">
            Orders
          </span>
        </h3>
      </div>

      {/* Orders Content */}
      <div className="my-4 px-4 sm:px-6 mb-8">
        {loading ? (
          <div className="flex flex-col justify-center mt-4">
            <p className="text-center text-base sm:text-lg">Loading your orders...</p>
            <div className="flex justify-center mt-4">
              <ClipLoader color="#000" size={40} sm:size={55} />
            </div>
          </div>
        ) : orders.length === 0 ? (
          <div className="my-16 sm:my-32 text-center">
            <p className="font-mono text-lg sm:text-2xl md:text-4xl lg:text-6xl mb-8 sm:mb-12">
              Your order history is empty
            </p>
            <Link
              to="/collection"
              className="font-outfit text-base sm:text-xl md:text-2xl bg-black text-white px-4 py-2 sm:px-6 sm:py-3 hover:text-slate-300 rounded-sm shadow-sm hover:shadow-lg transition"
            >
              Click here to make an order
            </Link>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-0">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border-y border-slate-200 items-center py-4 grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 sm:gap-4"
              >
                {/* Order Info */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-stone-800 font-outfit font-medium text-sm sm:text-base md:text-lg">
                    Order #{order.invoice_no}
                  </h3>
                  {order.items.map((item, index) => (
                    <div key={index} className="flex gap-2 sm:gap-3">
                      <img
                        src={item.image1_url || "default-image.jpg"}
                        alt={item.name}
                        loading="lazy"
                        className="w-16 h-20 sm:w-20 sm:h-24 rounded object-contain"
                      />
                      <div className="text-xs sm:text-sm flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p>
                          <span className="text-stone-800">Size: </span>
                          {item.size}
                        </p>
                        <p>
                          <span className="text-stone-800">Price: </span>
                          {item.price}
                        </p>
                        <p>
                          <span className="text-stone-800">Quantity: </span>
                          {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 mt-1 sm:mt-2">
                    <div className="flex items-center text-stone-500 font-outfit font-light text-xs sm:text-sm">
                      <FaNairaSign />
                      <p>{new Intl.NumberFormat().format(order.amount)}</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm">
                    <span className="text-stone-800">Date: </span>
                    {new Date(order.updated_at).toLocaleDateString()}
                  </p>
                </div>

                {/* Status - Stacked on mobile */}
                <div className="flex items-center justify-start sm:justify-center font-outfit text-xs sm:text-sm md:text-base">
                  {order.order_status === "processing" ? (
                    <p className="flex items-center gap-1 sm:gap-2">
                      <span className="bg-yellow-500 rounded-full w-2 h-2 sm:w-3 sm:h-3"></span>
                      <span className="text-stone-800 font-light">
                        Ready to ship
                      </span>
                    </p>
                  ) : (
                    <p className="flex items-center gap-1 sm:gap-2">
                      <span className="bg-green-500 rounded-full w-2 h-2 sm:w-3 sm:h-3"></span>
                      <span className="text-stone-800 font-light">
                        Shipped
                      </span>
                    </p>
                  )}
                </div>

                {/* Track Order Button - Full width on mobile */}
                <button
                  className="text-stone-800 font-outfit h-10 text-xs sm:text-sm md:text-base px-3 py-1 sm:px-4 sm:py-2 hover:border hover:border-gray-500 hover:rounded-md transition w-full sm:w-auto"
                  onClick={() => TrackOrderClick(order)}
                >
                  Track Order
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Track Order Modal */}
      <TrackOrder
        modalOpen={trackOrder}
        modalClose={() => setTrackOrder(false)}
        first_name={trackOrderDetails[0]}
        last_name={trackOrderDetails[1]}
        phone={trackOrderDetails[2]}
        email={trackOrderDetails[3]}
        address={trackOrderDetails[4]}
        invoice_no={trackOrderDetails[5]}
        payment_method={trackOrderDetails[6]}
        payment_status={trackOrderDetails[7]}
        order_status={trackOrderDetails[8]}
        total_price={trackOrderDetails[9]}
        city={trackOrderDetails[10]}
        country={trackOrderDetails[11]}
        zip_code={trackOrderDetails[12]}
        state={trackOrderDetails[13]}
      />
    </div>
  );
}