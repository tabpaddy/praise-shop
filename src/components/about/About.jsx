import Subscribe from "../subscribe/Subscribe";
import about_img from "../../assets/about_img.png";
import ChooseUs from "./ChooseUs";

export default function About() {
  return (
    <div>
      <div className="text-center my-2 mt-10">
        <h3 className="relative font-outfit font-normal text-2xl sm:text-3xl">
          ABOUT{" "}
          <span className="relative font-semibold after:content-[''] after:absolute after:w-[50px] after:pt-1 after:h-[1px] after:bg-black after:top-1/2 after:left-full after:ml-2">
            US
          </span>
        </h3>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 justify-between items-center my-16">
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <img
            src={about_img}
            alt="About Us"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="font-outfit font-normal text-base leading-6 text-slate-500 w-full lg:w-1/2">
          <article className="my-4">
            At Praise Shop, we believe fashion is a way to express individuality
            and confidence. Our journey began with a vision to create a platform
            where customers can effortlessly explore and shop for stylish,
            high-quality clothing that reflects their unique tastes.
          </article>
          <article className="my-4">
            We are dedicated to curating a wide range of trendy and timeless
            fashion pieces, including apparel, accessories, and footwear,
            sourced from trusted designers and brands. At Praise Shop, every
            product is chosen with care to ensure it meets the highest standards
            of quality and style.
          </article>
          <h3 className="text-xl text-slate-600 font-semibold my-4">
            Our Mission
          </h3>
          <article className="my-4">
            Our mission at Praise Shop is to inspire confidence and elevate
            personal style. We strive to provide a seamless shopping experience,
            from browsing and selecting the perfect outfit to delivery and
            beyond. We are committed to empowering our customers with
            fashionable choices that celebrate individuality and make every day
            special.
          </article>
        </div>
      </div>

      <ChooseUs />
      <Subscribe />
    </div>
  );
}
