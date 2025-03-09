import { Link } from "react-router-dom";

export default function Footer() {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white mt-auto px-4 sm:px-6 lg:px-8 py-12 text-stone-800">
      {/* Content Container */}
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-3 justify-items-start">
        <div>
          <h2 className="text-2xl font-semibold text-black">Praise Shop</h2>
          <p className="font-outfit text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
            Welcome to Praise Shop, your one-stop destination for quality
            products. We’re committed to exceptional service and a seamless
            shopping experience. Discover our wide range of products today!
          </p>
        </div>
        <div>
          <h3 className="font-outfit font-semibold text-lg text-black mb-4">
            COMPANY
          </h3>
          <div className="flex flex-col space-y-3">
            <Link to="/" className="font-outfit text-sm text-gray-600 hover:text-black transition-colors duration-200">
              Home
            </Link>
            <Link to="/about" className="font-outfit text-sm text-gray-600 hover:text-black transition-colors duration-200">
              About Us
            </Link>
            <Link to="/padp" className="font-outfit text-sm text-gray-600 hover:text-black transition-colors duration-200">
              Delivery
            </Link>
            <Link to="/privacy" className="font-outfit text-sm text-gray-600 hover:text-black transition-colors duration-200">
              Privacy Policy
            </Link>
          </div>
        </div>
        <div>
          <h3 className="font-outfit font-semibold text-lg text-black mb-4">
            GET IN TOUCH
          </h3>
          <ul className="space-y-3">
            <li className="font-outfit text-sm text-gray-600">
              <a href="tel:09066605427" className="hover:text-black transition-colors duration-200">
                09066605427
              </a>
            </li>
            <li className="font-outfit text-sm text-gray-600">
              <a href="mailto:taborotap@gmail.com" className="hover:text-black transition-colors duration-200">
                taborotap@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr className="my-8 border-t border-gray-200" />
      <div className="font-outfit text-xs sm:text-sm  text-gray-600 text-center flex justify-center items-center space-x-2">
      <span>&copy;</span>
        <span>{currentYear} PraiseTheDeveloper - All Rights Reserved.</span>
      </div>
    </footer>
  );
}
