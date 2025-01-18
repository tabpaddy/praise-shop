export default function ChooseUs() {
  return (
    <div>
      <div className="text-left my-2 mt-8">
        <h3 className="text-slate-700 relative font-outfit font-normal text-3xl sm:text-4xl">
          WHY{" "}
          <span className="text-black relative font-semibold after:content-[''] after:absolute after:w-[50px] after:pt-1 after:h-[1px] after:bg-black after:top-1/2 after:left-full after:ml-2">
            CHOOSE US
          </span>
        </h3>
      </div>
      <div className="flex justify-center font-outfit mt-10 my-4 flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="p-6 sm:p-8 md:p-10 py-10 sm:py-16 md:py-20 border rounded-lg shadow-none sm:shadow-md hover:shadow-lg transition-shadow">
          <h3 className="font-outfit font-semibold text-base sm:text-lg md:text-xl text-slate-700 mb-4">
            Quality Assurance:
          </h3>
          <article className="font-normal text-sm sm:text-base text-slate-500 leading-6">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </article>
        </div>
        <div className="p-6 sm:p-8 md:p-10 py-10 sm:py-16 md:py-20 border rounded-lg shadow-none sm:shadow-md hover:shadow-lg transition-shadow">
          <h3 className="font-outfit font-semibold text-base sm:text-lg md:text-xl text-slate-700 mb-4">
            Convenience:
          </h3>
          <article className="font-normal text-sm sm:text-base text-slate-500 leading-6">
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </article>
        </div>
        <div className="p-6 sm:p-8 md:p-10 py-10 sm:py-16 md:py-20 border rounded-lg shadow-none sm:shadow-md hover:shadow-lg transition-shadow">
          <h3 className="font-outfit font-semibold text-base sm:text-lg md:text-xl text-slate-700 mb-4">
            Exceptional Customer Service:
          </h3>
          <article className="font-normal text-sm sm:text-base text-slate-500 leading-6">
            Our team of dedicated professionals is here to assist you the way,
            ensuring your satisfaction is our top priority.
          </article>
        </div>
      </div>
    </div>
  );
}
