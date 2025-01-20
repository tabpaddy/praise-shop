import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import AdminLogin from "./pages/auth/AdminLogin";

export default function AdminApp() {
  return (
    <div className="xl:mx-20 lg:mx-16 md:mx-8 sm:mx-4 mx-2">
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}
