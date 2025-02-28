import { useContext, useState } from "react";
import { FaNairaSign } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../../../context/UserContext";
import {
  clearForm,
  setCity,
  setCountry,
  setEmail,
  setError,
  setFirstName,
  setLastName,
  setPhone,
  setState,
  setStreet,
  setSuccess,
  setZipCode,
} from "../../../redux/DeliveryInformationSlice";
import stripe_logo from "../../../../assets/stripe_logo.png";
import razorpay_logo from "../../../../assets/razorpay_logo.png";
import api from "../../../axiosInstance/api";

export default function PADP() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(""); // Track selected payment method
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
  const { subTotal, shippingFee, total } = useSelector((state) => state.cart);
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
      newErrors.zipCode = "ZipCode is Required.";
    }
    if (!country.trim()) {
      newErrors.country = "Country is Required.";
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone is Required.";
    }
    if (!paymentMethod)
      newErrors.paymentMethod = "Please select a payment method.";

    dispatch(setError(newErrors));
    return Object.keys(newErrors).length === 0;
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("street", street);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("zipCode", zipCode);
    formData.append("country", country);
    formData.append("phone", phone);
    formData.append("paymentMethod", paymentMethod); // Include payment method

    const headers = {
      Authorization: user ? `Bearer ${user?.userToken}` : "",
    };
    try {
      const response = await api.post("/payment-information", formData, {
        headers,
      });
      if (response.status === 200) {
        dispatch(setSuccess(response.data.message));
        setTimeout(() => {
          dispatch(clearForm());
          window.location.href = "/order";
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error("validation errors:", error.response.data.errors);
        const validationErrors = error.response.data.errors;
        dispatch(setError({ message: validationErrors }));
      } else {
        console.error("submission failed:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="mb-52">
      <form
        onSubmit={handleOrder}
        className="grid md:grid-cols-2 grid-cols-1 gap-5"
      >
        <div className="mx-auto">
          <div className="text-left my-3 mt-10">
            <h3 className="text-slate-700 relative font-outfit font-normal text-2xl sm:text-3xl">
              Delivery{" "}
              <span className="text-black relative font-semibold after:content-[''] after:absolute after:w-[30px] after:pt-1 after:h-[1px] after:bg-black after:top-1/2 after:left-full after:ml-2">
                Information
              </span>
            </h3>
          </div>

          <div className="items-start font-outfit max-w-md">
            <div className="flex items-center  gap-2">
              <div className="mb-4 flex gap-3">
                <div className="">
                  <input
                    type="text"
                    className={`p-2 my-1 w-full border-2 rounded ${
                      error.firstName ? "border-red-500" : "border-slate-200"
                    }`}
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => {
                      dispatch(setFirstName(e.target.value));
                      dispatch(setError({ ...error, firstName: "" }));
                    }}
                  />
                  {error.firstName && (
                    <span className="text-xs text-red-500">
                      {error.firstName}
                    </span>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    className={`p-2 my-1 w-full border-2 rounded ${
                      error.lastName ? "border-red-500" : "border-slate-200"
                    }`}
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => {
                      dispatch(setLastName(e.target.value));
                      dispatch(setError({ ...error, lastName: "" }));
                    }}
                  />
                  {error.lastName && (
                    <span className="text-xs text-red-500">
                      {error.lastName}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email Address"
                className={`p-2 my-1 w-full border-2 rounded ${
                  error.email ? "border-red-500" : "border-slate-200"
                }`}
                value={email}
                onChange={(e) => {
                  dispatch(setEmail(e.target.value));
                  dispatch(setError({ ...error, email: "" }));
                }}
              />
              {error.email && (
                <span className="text-xs text-red-500">{error.email}</span>
              )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Street"
                className={`p-2 my-1 w-full border-2 rounded ${
                  error.street ? "border-red-500" : "border-slate-200"
                }`}
                value={street}
                onChange={(e) => {
                  dispatch(setStreet(e.target.value));
                  dispatch(setError({ ...error, street: "" }));
                }}
              />
              {error.street && (
                <span className="text-xs text-red-500">{error.street}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="mb-4 flex gap-3">
                <div className="">
                  <input
                    type="text"
                    placeholder="City"
                    className={`p-2 my-1 w-full border-2 rounded ${
                      error.city ? "border-red-500" : "border-slate-200"
                    }`}
                    value={city}
                    onChange={(e) => {
                      dispatch(setCity(e.target.value));
                      dispatch(setError({ ...error, city: "" }));
                    }}
                  />
                  {error.city && (
                    <span className="text-xs text-red-500">{error.city}</span>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    className={`p-2 my-1 w-full border-2 rounded ${
                      error.state ? "border-red-500" : "border-slate-200"
                    }`}
                    value={state}
                    onChange={(e) => {
                      dispatch(setState(e.target.value));
                      dispatch(setError({ ...error, state: "" }));
                    }}
                    placeholder="State"
                  />
                  {error.state && (
                    <span className="text-xs text-red-500">{error.state}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="mb-4 flex gap-3">
                <div className="">
                  <input
                    type="text"
                    className={`p-2 my-1 w-full border-2 rounded ${
                      error.zipCode ? "border-red-500" : "border-slate-200"
                    }`}
                    value={zipCode}
                    onChange={(e) => {
                      dispatch(setZipCode(e.target.value));
                      dispatch(setError({ ...error, zipCode: "" }));
                    }}
                    placeholder="Zip Code"
                  />
                  {error.zipCode && (
                    <span className="text-xs text-red-500">
                      {error.zipCode}
                    </span>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    className={`p-2 my-1 w-full border-2 rounded ${
                      error.country ? "border-red-500" : "border-slate-200"
                    }`}
                    value={country}
                    onChange={(e) => {
                      dispatch(setCountry(e.target.value));
                      dispatch(setError({ ...error, country: "" }));
                    }}
                    placeholder="Country"
                  />
                  {error.country && (
                    <span className="text-xs text-red-500">
                      {error.country}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-4">
              <input
                type="text"
                className={`p-2 my-1 w-full border-2 rounded ${
                  error.phone ? "border-red-500" : "border-slate-200"
                }`}
                value={phone}
                onChange={(e) => {
                  dispatch(setPhone(e.target.value));
                  dispatch(setError({ ...error, phone: "" }));
                }}
                placeholder="Phone"
              />
              {error.phone && (
                <span className="text-xs text-red-500">{error.phone}</span>
              )}
            </div>
          </div>
        </div>

        <div className="mx-auto">
          <div className="sm:w-full w-11/12  mt-20">
            <div className="w-full max-w-md mb-4 mx-3 sm:mx-0 text-right">
              <div className="text-left my-3 mt-5 ">
                <h3 className="text-slate-700 relative font-outfit font-normal text-xl sm:text-lg">
                  Cart{" "}
                  <span className="text-black relative font-semibold after:content-[''] after:absolute after:w-[30px] after:pt-1 after:h-[1px] after:bg-black after:top-1/2 after:left-full after:ml-2">
                    Totals
                  </span>
                </h3>
              </div>
              <div className="w-full">
                <div className="flex justify-between font-outfit text-base font-medium text-stone-700 py-3">
                  <p className="">Subtotal</p>
                  <div className="flex items-center font-outfit font-light">
                    <FaNairaSign />
                    <p>{new Intl.NumberFormat().format(subTotal)}</p>
                  </div>
                </div>
                <div className="flex border-y-2 border-slate-200 justify-between font-medium font-outfit text-base text-stone-700 py-3">
                  <p className="">Shipping Fee</p>
                  <div className="flex items-center font-outfit font-light">
                    <FaNairaSign />
                    <p>{new Intl.NumberFormat().format(shippingFee)}</p>
                  </div>
                </div>
                <div className="flex justify-between font-outfit text-xl font-bold text-stone-900 py-3">
                  <p className="">Total</p>
                  <div className="flex items-center font-outfit text-base font-light">
                    <FaNairaSign />
                    <p>{new Intl.NumberFormat().format(total)}</p>
                  </div>
                </div>

                <div>
                  <div className="text-left my-3 mt-10 ">
                    <h3 className="text-slate-700 relative font-outfit font-normal text-xl sm:text-lg">
                      PAYMENT{" "}
                      <span className="text-black relative font-semibold after:content-[''] after:absolute after:w-[30px] after:pt-1 after:h-[1px] after:bg-black after:top-1/2 after:left-full after:ml-2">
                        METHOD
                      </span>
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="flex items-center gap-2 border-2 border-slate-200 px-1 py-1 sm:py-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={"stripe"}
                        checked={paymentMethod === "stripe"}
                        onChange={(e) => {
                          setPaymentMethod(e.target.value);
                          dispatch(setError({ ...error, paymentMethod: "" }));
                        }}
                        id=""
                        size={20}
                      />
                      <img
                        src={stripe_logo}
                        sizes="10"
                        alt="stripe payment"
                        className="sm:w-16 w-10"
                      />
                    </div>
                    <div className="flex items-center gap-2 border-2 border-slate-200 px-1 py-1 sm:py-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={"razorpay"}
                        checked={paymentMethod === "razorpay"}
                        onChange={(e) => {
                          setPaymentMethod(e.target.value);
                          dispatch(setError({ ...error, paymentMethod: "" }));
                        }}
                        id=""
                        size={20}
                      />
                      <img
                        src={razorpay_logo}
                        alt="razorpay payment"
                        className="sm:w-20 w-16"
                      />
                    </div>
                    <div className="flex items-center gap-2 border-2 border-slate-200 px-1 py-1 sm:py-2">
                      <input
                        type="radio"
                        name="paymentMethod" // Same name ensures single selection
                        value={"cod"}
                        checked={paymentMethod === "cod"}
                        onChange={(e) => {
                          setPaymentMethod(e.target.value);
                          dispatch(setError({ ...error, paymentMethod: "" }));
                        }}
                        id=""
                        size={20}
                      />
                      <label className="text-xs text-slate-500">
                        CASH ON DELIVERY
                      </label>
                    </div>
                  </div>
                  {error.paymentMethod && (
                    <span className="text-xs text-red-500 block mb-2">
                      {error.paymentMethod}
                    </span>
                  )}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-10 py-3 font-outfit font-medium text-base bg-black text-white hover:text-slate-300"
                  >
                    {isLoading ? "Processing..." : "Place Order"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
