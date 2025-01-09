import { Link } from "react-router-dom";

export default function Footer() {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white px-6 py-10">
      {/* Content Container */}
      <div className="grid gap-8 md:grid-cols-3 justify-items-start text-stone-800">
        {/* Left Section */}
        <div>
          <h2 className="text-xl font-semibold text-black">Praise Shop</h2>
          <article className="font-outfit font-normal text-sm sm:text-base my-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </article>
        </div>

        {/* Center Section */}
        <div>
          <h3 className="font-outfit font-semibold text-lg text-black mb-4">
            COMPANY
          </h3>
          <div className="flex flex-col space-y-2">
            <Link
              to="/"
              className="font-outfit font-normal text-sm hover:text-black transition"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="font-outfit font-normal text-sm hover:text-black transition"
            >
              About us
            </Link>
            <Link
              to="/PADP"
              className="font-outfit font-normal text-sm hover:text-black transition"
            >
              Delivery
            </Link>
            <Link
              to="/privacy"
              className="font-outfit font-normal text-sm hover:text-black transition"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="font-outfit font-semibold text-lg text-black mb-4">
            GET IN TOUCH
          </h3>
          <div>
            <ul>
              <li className="mb-2">09066605427</li>
              <li>taborotap@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-6 border-t text-slate-200" />

      {/* Footer Bottom */}
      <article className="font-outfit font-normal text-xs sm:text-sm text-center text-black flex justify-center items-center space-x-2">
        {/* Copyright Icon */}
        <span>&copy;</span>
        <span>{currentYear} PraiseTheDeveloper - All Rights Reserved.</span>
      </article>
    </footer>
  );
}
