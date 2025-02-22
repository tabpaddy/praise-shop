import { useEffect, useState } from "react";
import { FaNairaSign } from "react-icons/fa6";
import { Link } from "react-router-dom";
import api from "../../../axiosInstance/api";

export default function BestSeller() {
  const [bestSeller, setBestSeller] = useState([]);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const fetchBestSeller = async () => {
    try {
      const response = await api.get("/api/get_bestseller", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      //console.log(response.data.bestSellers);
      setBestSeller(response.data.bestSellers);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error(
          "Error fetching bestseller:",
          error.response.data || error.message
        );
      } else {
        console.error("getting bestseller failed:", error);
      }
    }
  };

  // Track Window Resize
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchBestSeller();
    };

    fetchData();
  }, []);

  // Determine Items to Display Based on Screen Size
  const displayedItems = screenSize < 640 ? bestSeller.slice(0, 4) : bestSeller;

  return (
    <div className="my-20">
      {/* Title Section */}
      <div className="text-center my-10">
        <h3 className="text-slate-700 relative font-outfit font-normal text-2xl sm:text-3xl">
          BEST{" "}
          <span className="text-black relative font-semibold after:content-[''] after:absolute after:w-[40px] after:pt-1 after:h-[1px] after:bg-black after:ml-2 after:top-1/2 after:left-full">
            SELLER
          </span>
        </h3>
        <p className="font-outfit font-normal text-stone-400 text-base sm:text-lg my-2">
          Discover our top-selling products, loved by customers for their
          **exceptional quality** and **great value**.
        </p>
      </div>

      {/* Bestseller Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
        {displayedItems.map((item) => (
          <div
            key={item.id}
            className="block font-outfit font-medium text-sm leading-2 text-left"
          >
            <Link to={`/product/${item.id}`}>
              {/* Product Image */}
              <img
                className="object-contain shadow-sm w-full rounded-md"
                src={item.image1_url}
                alt={item.name}
              />

              {/* Product Name */}
              <p className="text-xs my-1">{item.name}</p>

              {/* Price Section */}
              <div className="flex items-center justify-left gap-1 text-lg font-semibold text-slate-800">
                <FaNairaSign className="text-base" />
                <p>{item.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
