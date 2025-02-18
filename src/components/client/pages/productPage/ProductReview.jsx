import { useState } from "react";

export default function ProductReview() {
  const [activeDropdown, setActiveDropdown] = useState("description");

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown((prev) => (prev === dropdownName ? "" : dropdownName));
  };

  return (
    <div className="my-44 font-outfit">
      <div className="flex items-center">
        <h3
          className={`text-base font-bold border px-6 py-4 ${
            activeDropdown === "description"
              ? " text-slate-900"
              : "text-slate-400"
          }`}
          onClick={() => toggleDropdown("description")}
        >
          Description
        </h3>
        <h3
          className={`text-base font-bold  border px-6 py-4 ${
            activeDropdown === "review" ? "text-slate-900" : "text-slate-400"
          }`}
          onClick={() => toggleDropdown("review")}
        >
          Reviews (122)
        </h3>
      </div>
      {activeDropdown === "description" && (
        <div className="w-full px-6 py-10 border">
          <p className="text-base font-normal text-stone-500 my-2">
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p className="text-base font-normal text-stone-500 my-2">
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      )}
      {/* Reviews Content */}
      {activeDropdown === "review" && (
        <div className="w-full px-6 py-10 border">
          <p className="text-base font-normal text-stone-500 my-2">
            This is the reviews section. Users can leave reviews and check other
            people's experiences with the product.
          </p>
        </div>
      )}
    </div>
  );
}
