import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../../../context/AdminContext";
import api from "../../../../../axiosInstance/api";

export default function Orders() {
  const [manageOrder, setManageOrder] = useState([]);

  const { admin } = useContext(AdminContext);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/api/admin/order", {
        headers: {
          Authorization: `Bearer ${admin.adminToken}`,
        },
      });
      console.log(response.data.order);
      setManageOrder(response.data.order);
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
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
