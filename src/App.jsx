import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Collection from "./components/collection/Collection";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="xl:mx-20 lg:mx-16 md:mx-8 sm:mx-4 mx-2">
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
    </div>
  );
}

export default App;
