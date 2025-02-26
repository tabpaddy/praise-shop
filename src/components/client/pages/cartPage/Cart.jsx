import { useDispatch, useSelector } from "react-redux";
import { removeItem, setUserCart, setQuantity } from "../../../redux/CartSlice";
import api from "../../../axiosInstance/api";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { AiFillDelete } from "react-icons/ai";
import { FaNairaSign } from "react-icons/fa6";

export default function Cart() {
  const { cart, cart_id, quantities } = useSelector((state) => state.cart);
  const { user } = useContext(UserContext);
  const dispatch = useDispatch();

  // Function to handle quantity changes
  const handleQuantityChange = (id, newQuantity) => {
    const quantity = Math.max(1, Math.min(10, parseInt(newQuantity) || 1));
    dispatch(setQuantity({ id, quantity }));
  };

  // Calculate total price for an individual item
  const calculateItemTotal = (item) => {
    const quantity = quantities[item.id] || 1;
    return item.product.price || item.price * quantity;
  };

   // Calculate subtotal for all items
   const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  };

  const syncCartWithBackend = async () => {
    try {
      const headers = {
        Authorization: user ? `Bearer ${user.userToken}` : "",
      };
    //   console.log(
    //     "User:",
    //     user ? "Authenticated" : "Guest",
    //     "Cart ID:",
    //     cart_id
    //   );
      if (user && cart_id) {
        console.log("Merging cart for user", user.id, "with cart_id", cart_id);
        await api.post(
          "/api/merge-cart",
          { cart_id },
          { headers, withCredentials: true }
        );
      }
      const endpoint = user ? `/api/cart/${user.id}` : `/api/cart/${cart_id}`;
      console.log("Fetching from endpoint:", endpoint);
      const response = await api.get(endpoint, {
        headers,
        withCredentials: true,
      });
      console.log("Backend response:", response.data);
      dispatch(setUserCart(response.data));
    } catch (error) {
      console.error(
        "Error syncing cart:",
        error.response?.data || error.message
      );
      console.log("Axios error details:", error);
    }
  };

  useEffect(() => {
    console.log("useEffect triggered - User:", user, "Cart ID:", cart_id);
    if (cart_id || user) syncCartWithBackend();
  }, [user, cart_id, dispatch]);

  const handleDeleteButton = async (id, size) => {
    try {
      dispatch(removeItem({ id, size }));
      const headers = {
        Authorization: user ? `Bearer ${user.userToken}` : "",
      };
      await api.delete(`/api/remove-item/${id}`, {
        data: { cart_id }, // Pass cart_id in the body
        headers,
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error removing item:", error);
      syncCartWithBackend();
    }
  };
//   console.log("cart:", cart);
//   console.log("guest id:", cart_id);
//   console.log("user:", user);
  return (
    <div className={cart.length === 0 ? `mb-20 md:mb-64 lg:mb-96 ` : "mb-10"}>
      <div className="text-left my-3 mt-10 px-6">
        <h3 className="text-slate-700 relative font-outfit font-normal text-2xl sm:text-3xl">
          Your{" "}
          <span className="text-black relative font-semibold after:content-[''] after:absolute after:w-[30px] after:pt-1 after:h-[1px] after:bg-black after:top-1/2 after:left-full after:ml-2">
            Cart
          </span>
        </h3>
      </div>

      <div className="my-5 px-6 mb-10">
        {cart.length === 0 ? (
          <p className="flex justify-center my-52 font-mono text-2xl md:text-7xl xl:9xl">
            Your cart is empty
          </p>
        ) : (
          <div>
            {cart.map((item) => (
              <div
                key={item.id}
                className="border-y border-slate-200 grid sm:grid-cols-[1fr_1fr_auto] grid-cols-[1fr_auto_auto] gap-4 items-center py-5"
              >
                <div className="flex gap-2 sm:gap-4">
                  {/* Product Image */}
                  <div>
                    <img
                      src={item.image1_url || item.image}
                      alt={item.product?.name || item.name || "Item"}
                      className="w-[80px] sm:w-[95px] rounded object-contain"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col ">
                    <h3 className="text-stone-800 font-outfit font-medium text-sm sm:text-lg">
                    {item.product?.name || item.name || "Unknown Product"}
                    </h3>
                    <div className="flex gap-2 sm:gap-3 mt-2 items-center">
                      <div className="flex items-center text-stone-500 font-outfit font-light text-xs sm:text-sm">
                        <FaNairaSign />
                        <p>
                        {new Intl.NumberFormat().format(calculateItemTotal(item))}
                        </p>
                      </div>
                      <p className="px-3 py-1 border border-gray-300 rounded-md text-xs sm:text-base">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quantity Input */}
                <div className="border border-gray-300 px-2 py-1 w-[60px] sm:w-[80px] rounded-md">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={quantities[item.id] || 1}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    className="w-full text-center outline-none appearance:textfield [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    style={{ MozAppearance: "textfield" }} // For Firefox
                  />
                </div>

                {/* Delete Button */}
                <button
                  className="text-stone-800 hover:text-red-500 transition"
                  onClick={() => handleDeleteButton(item.id, item.size)}
                >
                  <AiFillDelete size={20} />
                </button>
              </div>
            ))}
            <div className="flex justify-end">
              <div className="w-full sm:w-1/2 mb-52 mx-3 sm:mx-0 text-right">
                <div className="text-left my-3 mt-5 ">
                  <h3 className="text-slate-700 relative font-outfit font-normal text-2xl sm:text-3xl">
                    Cart{" "}
                    <span className="text-black relative font-semibold after:content-[''] after:absolute after:w-[30px] after:pt-1 after:h-[1px] after:bg-black after:top-1/2 after:left-full after:ml-2">
                      Totals
                    </span>
                  </h3>
                </div>
                <div>
                  <div className="flex justify-between font-outfit text-base font-medium text-stone-700 py-3">
                    <p className="">Subtotal</p>
                    <div className="flex items-center font-outfit font-light">
                      <FaNairaSign />
                      <p>{new Intl.NumberFormat().format(calculateSubtotal())}</p>
                    </div>
                  </div>
                  <div className="flex border-y-2 border-slate-200 justify-between font-medium font-outfit text-base text-stone-700 py-3">
                    <p className="">Shipping Free</p>
                    <div className="flex items-center font-outfit font-light">
                      <FaNairaSign />
                      <p>{new Intl.NumberFormat().format(1230)}</p>
                    </div>
                  </div>
                  <div className="flex justify-between font-outfit text-xl font-bold text-stone-900 py-3">
                    <p className="">Total</p>
                    <div className="flex items-center font-outfit text-base font-light">
                      <FaNairaSign />
                      <p>{new Intl.NumberFormat().format(1230)}</p>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 font-outfit font-medium text-lg bg-black text-white hover:text-slate-300"
                  >
                    Proceed to checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
