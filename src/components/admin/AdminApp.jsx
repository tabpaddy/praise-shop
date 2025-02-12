import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import AdminLogin from "./pages/auth/AdminLogin";
import AdminAddUserDashboard from "./pages/dashboard/AdminAddUserDashboard";
import AdminManageUser from "./pages/dashboard/AdminManageUser";
import AdminAddProduct from "./pages/dashboard/AdminAddProduct";
import AdminViewProduct from "./pages/dashboard/AdminViewProduct";
import AdminAddAdmin from "./pages/dashboard/AdminAddAdmin";
import AdminManageAdmin from "./pages/dashboard/AdminManageAdmin";
import AdminOrders from "./pages/dashboard/AdminOrders";
import ProtectedRoute from "../protectedRoutes/AdminProtectedRoutes";
import AdminAddCategory from "./pages/dashboard/AdminAddCategory";
import AdminManageCategory from "./pages/dashboard/AdminManageCategory";
import AdminAddSubCategory from "./pages/dashboard/AdminAddSubCategory";
import AdminManageSubCategory from "./pages/dashboard/AdminManageSubCategory";
import AdminEditProduct from "./pages/dashboard/AdminEditProduct";

export default function AdminApp() {
  return (
    <div className="bg-white">
      <Routes>
        {/* Public Route */}
        <Route path="/*" element={<AdminLogin />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/add-category"
          element={
            <ProtectedRoute>
              <AdminAddCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/manage-category"
          element={
            <ProtectedRoute>
              <AdminManageCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/add-sub-category"
          element={
            <ProtectedRoute>
              <AdminAddSubCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/manage-sub-category"
          element={
            <ProtectedRoute>
              <AdminManageSubCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/add-user"
          element={
            <ProtectedRoute>
              <AdminAddUserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/manage-users"
          element={
            <ProtectedRoute>
              <AdminManageUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/add-product"
          element={
            <ProtectedRoute>
              <AdminAddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/view-products"
          element={
            <ProtectedRoute>
              <AdminViewProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/view-products/edit-product/:id"
          element={
            <ProtectedRoute>
              <AdminEditProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/add-admin"
          element={
            <ProtectedRoute>
              <AdminAddAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/manage-admin"
          element={
            <ProtectedRoute>
              <AdminManageAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/orders"
          element={
            <ProtectedRoute>
              <AdminOrders />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
