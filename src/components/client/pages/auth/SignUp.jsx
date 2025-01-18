import Subscribe from "../subscribe/Subscribe";
import SignUpForm from "./SignUpForm";

export default function SignUp() {
  return (
    <div>
      <div className="text-center my-2 mt-10">
        <h3 className="text-slate-700 relative font-prata font-normal text-2xl sm:text-3xl">
          Sign{" "}
          <span className="relative after:content-[''] after:absolute after:w-[50px] after:pt-1 after:h-[0.5px] after:bg-black after:top-1/2 after:left-full after:ml-2">
            Up
          </span>
        </h3>
      </div>
      <div>
        <SignUpForm/>
      </div>
      <Subscribe />
    </div>
  );
}
