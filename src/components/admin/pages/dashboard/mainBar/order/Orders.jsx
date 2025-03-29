import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../../../context/AdminContext";
import api from "../../../../../axiosInstance/api";
import { FaNairaSign } from "react-icons/fa6";
import ViewOrder from "./ViewOrder";

export default function Orders() {
  const [manageOrder, setManageOrder] = useState([]);
  const [viewOrder, setViewOrder] = useState(false);
  const [viewOrderDetails, setViewOrderDetails] = useState([]);

  const { admin } = useContext(AdminContext);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/api/admin/order", {
        headers: {
          Authorization: `Bearer ${admin.adminToken}`,
        },
      });
      // console.log(response.data.orders);
      setManageOrder(response.data.orders);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error(
          "error fetching orders:",
          error.response.data || error.message
        );
      } else {
        console.error("getting order failed:", error);
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [admin.adminToken]);

  const viewOrderClick = (order) => {
    const delivery = order.delivery_information;
    const user = order.user;
    console.log("Order Data:", order);
    setViewOrder(true);
    setViewOrderDetails({
      first_name: delivery.first_name,
      last_name: delivery.last_name,
      phone: delivery.phone,
      street: delivery.street,
      email: delivery.email,
      city: delivery.city,
      country: delivery.country,
      zip_code: delivery.zip_code,
      state: delivery.state,
      username: user.name,
      invoice_no: order.invoice_no,
      amount: order.amount,
      payment_method: order.payment_method,
      payment_status: order.payment_status,
      payment_reference: order.payment_reference || "N/A",
      order_status: order.order_status,
      order_date: order.created_at,
      items: order.items,
    });
  };

  return (
    <div className="overflow-y-auto bg-slate-200 font-outfit p-6 min-h-screen">
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-8">
          Manage Orders
        </h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden mt-3 mb-16">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    S/N
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    UserName
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Invoice_num
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Payment_method
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Payment_status
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Order_status
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    DeliveryInformation
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-center text-sx font-medium text-slate-500 uppercase tracking-wider">
                    Operations
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Array.isArray(manageOrder) && manageOrder.length > 0 ? (
                  manageOrder.map((order, index) => (
                    <tr key={order.id}>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {order.user?.name || "N/A"}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {order.invoice_no}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        <div className="flex gap-1 items-center">
                          <FaNairaSign /> {order.amount}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {order.payment_method}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {order.payment_status}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {order.order_status}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {order.delivery_information?.first_name}{" "}
                        {order.delivery_information?.last_name}{" "}
                        {order.delivery_information.email}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        <p>{order.items ? order.items.length : 0} items</p>
                      </td>
                      <td className="px-6 py-3 text-center">
                        <button
                          className="text-indigo-600 hover:text-indigo-800"
                          onClick={() => viewOrderClick(order)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="11"
                      className="px-4 py-3 text-center text-sm text-slate-600"
                    >
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ViewOrder
        modalOpen={viewOrder}
        modalClose={() => setViewOrder(false)}
        {...viewOrderDetails}
      />
    </div>
  );
}
