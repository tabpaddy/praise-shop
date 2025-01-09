import Subscribe from "../subscribe/Subscribe";

export default function About() {
  return (
    <div>
      <div className="text-center my-2 mt-10">
        <h3 className="relative font-outfit font-normal text-4xl">
          ABOUT{" "}
          <span className="relative font-semibold after:content-[''] after:absolute after:w-[50px] after:h-[1px] after:bg-black after:top-1/2 after:left-full after:ml-2">
            US
          </span>
        </h3>
      </div>

      <Subscribe />
    </div>
  );
}
