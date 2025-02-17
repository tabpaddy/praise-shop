import { Route, Routes } from "react-router-dom";
import Header from "./pages/header/Header";
import Home from "./pages/home/Home";
import Collection from "./pages/collection/Collection";
import Product from "./pages/productPage/product";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Footer from "./pages/footer/Footer";
import SignUp from "./pages/auth/SignUp";
import LogIn from "./pages/auth/LogIn";
import PasswordReset from "./pages/auth/PasswordReset";

export default function ClientApp() {
  return (
    <div className="xl:mx-20 lg:mx-16 md:mx-8 sm:mx-4 mx-2">
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path={`/reset-password`} element={<PasswordReset />} />
        </Routes>
        <Footer />
      </>
    </div>
  );
}
