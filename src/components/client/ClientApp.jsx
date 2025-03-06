import { Route, Routes } from "react-router-dom";
import Header from "./pages/header/Header";
import Home from "./pages/home/Home";
import Collection from "./pages/collection/Collection";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Footer from "./pages/footer/Footer";
import SignUp from "./pages/auth/SignUp";
import LogIn from "./pages/auth/LogIn";
import PasswordReset from "./pages/auth/PasswordReset";
import Product from "./pages/productPage/Product";
import Cart from "./pages/cartPage/Cart";
import PADP from "./pages/paymentAndDeliveryPage/PADP";
import ProtectedRoute from "../protectedRoutes/UserProtectedRoutes";
import ProtectedRouteUser from "../protectedRoutes/UserProtectedRoutes";
// import api from "../axiosInstance/api";
// import { useEffect } from "react";

export default function ClientApp() {
  // const fetchCsrfToken = async () => {
  //   try {
  //     await api.get("/sanctum/csrf-cookie");
  //     await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
  //     console.log("CSRF cookie fetched");
  //   } catch (error) {
  //     console.error("Error fetching CSRF token:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchCsrfToken();
  // }, []);

  return (
    <div className="2xl:mx-52 3xl:mx-80 xl:mx-28 lg:mx-16 md:mx-8 sm:mx-4 mx-2">
      <>
        <Header />
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path={`/reset-password`} element={<PasswordReset />} />
          <Route
            path="/padp"
            element={
              <ProtectedRouteUser>
                <PADP />
              </ProtectedRouteUser>
            }
          />
        </Routes>
        <Footer />
      </>
    </div>
  );
}
