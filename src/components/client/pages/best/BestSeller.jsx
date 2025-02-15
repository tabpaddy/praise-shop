import axios from "axios";
import { useEffect, useState } from "react";

export default function BestSeller() {
  const [bestSeller, setBestSeller] = useState([]);

  const fetchBestSeller = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/get_bestseller",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.bestSellers);
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

  useEffect(() => {
    const fetchData = async () => {
      await fetchBestSeller();
    };

    fetchData();
  }, []);
  return (
    <div className="">
      <div className="text-center my-2 mt-10">
        <h3 className="text-slate-700 relative font-outfit font-normal text-2xl sm:text-3xl">
          BEST{" "}
          <span className="text-black relative font-semibold after:content-[''] after:absolute after:w-[50px] after:pt-1 after:h-[1px] after:bg-black after:ml-2 after:top-1/2 after:left-full">
            SELLER
          </span>
        </h3>
        <p className="font-outfit font-normal text-stone-400 text-base sm:text-lg my-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </p>
      </div>

      {/* bestseller image */}
      <div className="flex justify-center items-center my-4 flex-col flex-1 md:flex-row gap-3 lg:gap-6">
        {bestSeller.map((bestSeller) => {
            return (
              <div key={bestSeller.id} className="block font-outfit font-medium text-sm leading-2">
                <img className={`object-contain shadow-sm sm:w-full w-1/2`} src={bestSeller.image1_url} alt={bestSeller.name} />
                <p className="text-xs my-1">{bestSeller.name}</p>
                <p>{bestSeller.price}</p>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}
