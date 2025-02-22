import Subscribe from "../subscribe/Subscribe";
import BestSeller from "../best/BestSeller";
import Latest from "../latest/Latest";
import hero_img from "../../../../assets/hero_img.png";
import { FaExchangeAlt } from "react-icons/fa";
import { MdSupportAgent, MdHighQuality } from "react-icons/md";

const Home = () => {
  return (
    <div>
      <div className="my-20 mb-16 flex flex-col sm:flex-row items-stretch min-h-[400px]">
        {/* Text Section */}
        <div className="relative sm:w-1/2 p-8 py-24 sm:p-12 lg:p-16 border-2 border-gray-200 sm:border-r-0">
          <div className="absolute inset-0 flex flex-col justify-center items-start pl-6 sm:pl-12 md:pl-16">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute  top-1/2 w-5 h-px bg-stone-800 transform -translate-y-1/2"></div>
                <span className="inline-block text-xs sm:text-sm font-medium font-outfit text-stone-700 uppercase tracking-widest ml-8">
                  OUR BESTSELLER
                </span>
              </div>

              <h2 className="font-prata text-3xl sm:text-4xl md:text-5xl text-stone-700">
                Latest Arrivals
              </h2>

              <div className="group relative inline-block">
                <span className="text-lg sm:text-xl font-medium font-outfit text-stone-700 cursor-pointer hover:text-stone-800 transition-colors">
                  SHOP NOW
                </span>
                <div className="absolute left-full top-1/2 ml-2 w-12 h-px bg-stone-800 transform -translate-y-1/2 group-hover:w-16 transition-all"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="sm:w-1/2 relative overflow-hidden">
          <img
            src={hero_img}
            alt="Latest arrivals"
            className="w-full h-full object-cover object-center min-h-[300px] sm:min-h-[400px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-white/50"></div>
        </div>
      </div>
      <Latest />
      <BestSeller />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-14 text-center font-outfit my-40 px-6">
        {/* Easy Exchange Policy */}
        <div className="flex flex-col items-center">
          <div className="text-4xl text-slate-800 mb-2">
            <FaExchangeAlt />
          </div>
          <p className="font-semibold text-lg text-slate-800">
            Easy Exchange Policy
          </p>
          <p className="font-normal text-lg text-stone-500">
            We offer hassle-free exchange policy.
          </p>
        </div>

        {/* 7 Days Return Policy */}
        <div className="flex flex-col items-center">
          <div className="text-4xl text-slate-800 mb-2">
            <MdSupportAgent />
          </div>
          <p className="font-semibold text-lg text-slate-800">
            7 Days Return Policy
          </p>
          <p className="font-normal text-lg text-stone-500">
            We provide 7 days free return policy.
          </p>
        </div>

        {/* Best Customer Support */}
        <div className="flex flex-col items-center">
          <div className="text-4xl text-slate-800 mb-2">
            <MdHighQuality />
          </div>
          <p className="font-semibold text-lg text-slate-800">
            Best Customer Support
          </p>
          <p className="font-normal text-lg text-stone-500">
            We provide 24/7 customer support.
          </p>
        </div>
      </div>
      <Subscribe />
    </div>
  );
};

export default Home;
