import { useContext, useState } from "react";
import { FaNairaSign } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../../../context/UserContext";
import { setError } from "../../../redux/DeliveryInformationSlice";

export default function PADP() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {
    firstName,
    lastName,
    email,
    street,
    city,
    state,
    zipCode,
    country,
    phone,
    error,
    success,
  } = useSelector((state) => state.deliveryInformation);
  const { user } = useContext(UserContext);

  const validateForm = () => {
    const newErrors = {};
    if (!firstName.trim()) {
      newErrors.firstName = "First Name is Required.";
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Last Name is Required.";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!street.trim()) {
      newErrors.street = "Street is Required.";
    }
    if (!city.trim()) {
      newErrors.city = "City is Required.";
    }
    if (!state.trim()) {
      newErrors.state = "State is Required.";
    }
    if (!zipCode.trim()) {
      newErrors.state = "ZipCode is Required.";
    }
    if (!country.trim()) {
      newErrors.state = "Country is Required.";
    }
    if (!phone.trim()) {
      newErrors.state = "Phone is Required.";
    }

    dispatch(setError(newErrors));
    return Object.keys(newErrors).length === 0;
  };
  return (
    <div className="mb-10">
      <div className="text-left my-3 mt-10 px-6">
        <h3 className="text-slate-700 relative font-outfit font-normal text-2xl sm:text-3xl">
          Delivery{" "}
          <span className="text-black relative font-semibold after:content-[''] after:absolute after:w-[30px] after:pt-1 after:h-[1px] after:bg-black after:top-1/2 after:left-full after:ml-2">
            Information
          </span>
        </h3>
      </div>

      <div className="sm:flex flex-col items-center gap-5">
        <div className="w-full mx-auto max-w-md font-outfit">
          <div className="flex items-center gap-2">
            <div className="mb-4 flex gap-3">
              <div className="">
                <input
                  type="text"
                  className="p-2 my-1 w-full border-2 rounded"
                  placeholder="First Name"
                />
              </div>
              <div>
                <input
                  type="text"
                  className="p-2 my-1 w-full border-2 rounded"
                  placeholder="Last Name"
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <input
              type="email"
              className="p-2 my-1 w-full border-2"
              placeholder="Email Address"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="p-2 my-1 w-full border-2"
              placeholder="Street"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="mb-4 flex gap-3">
              <div className="">
                <input
                  type="text"
                  className="p-2 my-1 w-full border-2 rounded"
                  placeholder="City"
                />
              </div>
              <div>
                <input
                  type="text"
                  className="p-2 my-1 w-full border-2 rounded"
                  placeholder="State"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="mb-4 flex gap-3">
              <div className="">
                <input
                  type="text"
                  className="p-2 my-1 w-full border-2 rounded"
                  placeholder="Zip Code"
                />
              </div>
              <div>
                <input
                  type="text"
                  className="p-2 my-1 w-full border-2 rounded"
                  placeholder="Country"
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <input
              type="number"
              className="p-2 my-1 w-full border-2"
              placeholder="Phone"
            />
          </div>
        </div>
        <div>
          <div className="">
            <div className="w-full  mb-12 mx-3 sm:mx-0 text-right">
              <div className="text-left my-3 mt-5 ">
                <h3 className="text-slate-700 relative font-outfit font-normal text-2xl sm:text-3xl">
                  Cart{" "}
                  <span className="text-black relative font-semibold after:content-[''] after:absolute after:w-[30px] after:pt-1 after:h-[1px] after:bg-black after:top-1/2 after:left-full after:ml-2">
                    Totals
                  </span>
                </h3>
              </div>
              <div>
                <div className="flex justify-between font-outfit text-base font-medium text-stone-700 py-3">
                  <p className="">Subtotal</p>
                  <div className="flex items-center font-outfit font-light">
                    <FaNairaSign />
                    <p>{new Intl.NumberFormat().format(0)}</p>
                  </div>
                </div>
                <div className="flex border-y-2 border-slate-200 justify-between font-medium font-outfit text-base text-stone-700 py-3">
                  <p className="">Shipping Free</p>
                  <div className="flex items-center font-outfit font-light">
                    <FaNairaSign />
                    <p>{new Intl.NumberFormat().format(0)}</p>
                  </div>
                </div>
                <div className="flex justify-between font-outfit text-xl font-bold text-stone-900 py-3">
                  <p className="">Total</p>
                  <div className="flex items-center font-outfit text-base font-light">
                    <FaNairaSign />
                    <p>{new Intl.NumberFormat().format(0)}</p>
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 font-outfit font-medium text-lg bg-black text-white hover:text-slate-300"
                >
                  Proceed to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
