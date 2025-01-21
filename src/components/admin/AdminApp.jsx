import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import AdminLogin from "./pages/auth/AdminLogin";

export default function AdminApp() {
  return (
    <div className="bg-white">
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}
