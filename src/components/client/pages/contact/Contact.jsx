import Subscribe from "../subscribe/Subscribe";
import contact_img from "../../../../assets/contact_img.png";

export default function Contact() {
  return (
    <div>
      <div className="text-center my-2 mt-10">
        <h3 className="text-slate-700 relative font-outfit font-normal text-2xl sm:text-3xl">
          CONTACT{" "}
          <span className="text-black relative font-semibold after:content-[''] after:absolute after:w-[50px] after:pt-1 after:h-[1px] after:bg-black after:top-1/2 after:left-full after:ml-2">
            US
          </span>
        </h3>
      </div>
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 justify-center items-center my-16">
        {/* Contact Image */}
        <div className="w-full sm:w-1/2 lg:w-2/5">
          <img
            src={contact_img}
            alt="contact image"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Contact Details */}
        <div className="font-outfit text-sm text-left text-slate-500 w-full sm:w-1/2 lg:w-2/5">
          <div className="mb-10">
            <h3 className="font-semibold text-slate-900 text-base mb-2">
              Our Store
            </h3>
            <ul className="leading-6 space-y-1">
              <li>No20 Taborota Friday Close</li>
              <li>Asaba, Delta State, NIGERIA</li>
            </ul>
            <ul className="leading-6 space-y-1 mt-4">
              <li>09066605427</li>
              <li>taborotap@gmail.com</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 text-base mb-2">
              Careers at Forever
            </h3>
            <article className="my-4">
              Learn more about our teams and job openings.
            </article>
            <button
              disabled
              className="text-slate-800 border-2 border-slate-800 p-3 px-6 rounded-md cursor-not-allowed"
            >
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      <Subscribe />
    </div>
  );
}
