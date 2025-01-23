export default function UserBar() {
  return (
    <div className="overflow-y-auto bg-slate-200 font-outfit p-4">
      <div className="text-center my-2 mt-10">
        <h3 className="text-slate-700 relative font-prata font-normal text-2xl sm:text-3xl">
          SignUp{" "}
          <span className="relative after:content-[''] after:absolute after:w-[50px] after:pt-1 after:h-[0.5px] after:bg-black after:top-1/2 after:left-full after:ml-2">
            User
          </span>
        </h3>
      </div>
      <div className="flex justify-center items-center my-10 px-4">
        <form className="w-full max-w-md mx-auto font-outfit">
          <div className="mb-4">
            <input
              className="p-2 my-1 w-full border-2 rounded border-slate-900"
              type="text"
              name="name"
              placeholder="Name"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              className="p-2 my-1 w-full border-2 rounded border-slate-900"
              name="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="p-2 my-1 w-full border-2 rounded border-slate-900"
              name="password"
              placeholder="Password"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="p-2 my-1 w-full border-2 rounded border-slate-900"
              name="confirmPassword"
              placeholder="Confirm Password"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
