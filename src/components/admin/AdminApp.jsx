import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import AdminLogin from "./pages/auth/AdminLogin";
import AdminAddUserDashboard from "./pages/dashboard/AdminAddUserDashboard";
import AdminManageUser from "./pages/dashboard/AdminManageUser";
import AdminAddProduct from "./pages/dashboard/AdminAddProduct";
import AdminViewProduct from "./pages/dashboard/AdminViewProduct";
import AdminAddAdmin from "./pages/dashboard/AdminAddAdmin";
import AdminOrders from "./pages/dashboard/AdminOrders";

export default function AdminApp() {
  return (
    <div className="bg-white">
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard/*" element={<AdminDashboard />} />
        <Route path="/dashboard/add-user" element={<AdminAddUserDashboard />} />
        <Route path="/dashboard/manage-users" element={<AdminManageUser />} />
        <Route path="/dashboard/add-product" element={<AdminAddProduct />} />
        <Route Path="/dashboard/view-products" element={<AdminViewProduct />} />
        <Route path="/dashboard/add-admin" element={<AdminAddAdmin />}/>
        <Route path="/dashboard/orders" element={<AdminOrders /> }/>
      </Routes>
    </div>
  );
}
