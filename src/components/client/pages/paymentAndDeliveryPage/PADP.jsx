import { useContext, useEffect, useState } from "react";
import { FaMoneyBillWave, FaNairaSign } from "react-icons/fa6";
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
import paystack_logo from "../../../../assets/paystack_logo.png";
import api from "../../../axiosInstance/api";
import SuccessModal from "./SuccessModal";
import { Elements } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AlertModal from "../productPage/alertModal";

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
  const [successModal, setSuccessModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);

  useEffect(() => {
    if (user) {
      const headers = {
        Authorization: `Bearer ${user.userToken}`,
      };
      api
        .get("/api/delivery-information", { headers, withCredentials: true })
        .then((res) => {
          if (res.data.deliveryInfo) {
            dispatch(setFirstName(res.data.deliveryInfo.first_name));
            dispatch(setLastName(res.data.deliveryInfo.last_name));
            dispatch(setEmail(res.data.deliveryInfo.email));
            dispatch(setStreet(res.data.deliveryInfo.street));
            dispatch(setCity(res.data.deliveryInfo.city));
            dispatch(setState(res.data.deliveryInfo.state));
            dispatch(setZipCode(res.data.deliveryInfo.zip_code));
            dispatch(setCountry(res.data.deliveryInfo.country));
            dispatch(setPhone(res.data.deliveryInfo.phone));
          }
        })
        .catch((error) =>
          console.error("Error fetching delivery info:", error)
        );
    }
  }, [user, dispatch]);

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
      const response = await api.post("/api/payment-order", formData, {
        headers,
      });
      if (response.status === 200) {
        if (response.data.clientSecret) {
          // Handle Stripe payment confirmation on the frontend
          console.log("Stripe client secret:", response.data.clientSecret);
          const stripe = await loadStripe(
            process.env.REACT_APP_STRIPE_PUBLIC_KEY
          );
          const { error } = await stripe.confirmCardPayment(
            response.data.clientSecret
          );

          if (error) {
            // Handle error
            dispatch(setError({ message: "Payment failed" }));
            setAlertModal(true);
          } else {
            // Payment succeeded
            dispatch(setSuccess("Payment successful!"));
            setSuccessModal(true);
            // Redirect or update state
            setTimeout(() => {
              dispatch(clearForm());
              window.location.href = "/order";
            }, 2000);
          }
        } else if (response.data.payment_url) {
          // Redirect to Paystack payment page
          window.location.href = response.data.payment_url;
        } else {
          // Handle COD or simple success
          dispatch(setSuccess(response.data.message));
          setSuccessModal(true);
          setTimeout(() => {
            dispatch(clearForm());
            setSuccessModal(false);
            window.location.href = "/order";
          }, 8000);
        }
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
    <div className="mb-20 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleOrder}
        className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
      >
        {/* Delivery Information */}
        <div>
          <div className="text-left my-6">
            <h3 className="text-slate-700 font-outfit font-normal text-2xl sm:text-3xl">
              Delivery{" "}
              <span className="text-black font-semibold relative after:content-[''] after:absolute after:w-8 after:h-px after:bg-black after:top-1/2 after:left-full after:ml-2">
                Information
              </span>
            </h3>
          </div>

          <div className="font-outfit space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  className={`w-full p-3 border-2 rounded-lg ${
                    error.firstName ? "border-red-500" : "border-slate-200"
                  } focus:outline-none focus:ring-2 focus:ring-slate-400`}
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => {
                    dispatch(setFirstName(e.target.value));
                    dispatch(setError({ ...error, firstName: "" }));
                  }}
                />
                {error.firstName && (
                  <span className="text-xs text-red-500 mt-1 block">
                    {error.firstName}
                  </span>
                )}
              </div>
              <div>
                <input
                  type="text"
                  className={`w-full p-3 border-2 rounded-lg ${
                    error.lastName ? "border-red-500" : "border-slate-200"
                  } focus:outline-none focus:ring-2 focus:ring-slate-400`}
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => {
                    dispatch(setLastName(e.target.value));
                    dispatch(setError({ ...error, lastName: "" }));
                  }}
                />
                {error.lastName && (
                  <span className="text-xs text-red-500 mt-1 block">
                    {error.lastName}
                  </span>
                )}
              </div>
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className={`w-full p-3 border-2 rounded-lg ${
                  error.email ? "border-red-500" : "border-slate-200"
                } focus:outline-none focus:ring-2 focus:ring-slate-400`}
                value={email}
                onChange={(e) => {
                  dispatch(setEmail(e.target.value));
                  dispatch(setError({ ...error, email: "" }));
                }}
              />
              {error.email && (
                <span className="text-xs text-red-500 mt-1 block">
                  {error.email}
                </span>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Street"
                className={`w-full p-3 border-2 rounded-lg ${
                  error.street ? "border-red-500" : "border-slate-200"
                } focus:outline-none focus:ring-2 focus:ring-slate-400`}
                value={street}
                onChange={(e) => {
                  dispatch(setStreet(e.target.value));
                  dispatch(setError({ ...error, street: "" }));
                }}
              />
              {error.street && (
                <span className="text-xs text-red-500 mt-1 block">
                  {error.street}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="City"
                  className={`w-full p-3 border-2 rounded-lg ${
                    error.city ? "border-red-500" : "border-slate-200"
                  } focus:outline-none focus:ring-2 focus:ring-slate-400`}
                  value={city}
                  onChange={(e) => {
                    dispatch(setCity(e.target.value));
                    dispatch(setError({ ...error, city: "" }));
                  }}
                />
                {error.city && (
                  <span className="text-xs text-red-500 mt-1 block">
                    {error.city}
                  </span>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="State"
                  className={`w-full p-3 border-2 rounded-lg ${
                    error.state ? "border-red-500" : "border-slate-200"
                  } focus:outline-none focus:ring-2 focus:ring-slate-400`}
                  value={state}
                  onChange={(e) => {
                    dispatch(setState(e.target.value));
                    dispatch(setError({ ...error, state: "" }));
                  }}
                />
                {error.state && (
                  <span className="text-xs text-red-500 mt-1 block">
                    {error.state}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Zip Code"
                  className={`w-full p-3 border-2 rounded-lg ${
                    error.zipCode ? "border-red-500" : "border-slate-200"
                  } focus:outline-none focus:ring-2 focus:ring-slate-400`}
                  value={zipCode}
                  onChange={(e) => {
                    dispatch(setZipCode(e.target.value));
                    dispatch(setError({ ...error, zipCode: "" }));
                  }}
                />
                {error.zipCode && (
                  <span className="text-xs text-red-500 mt-1 block">
                    {error.zipCode}
                  </span>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Country"
                  className={`w-full p-3 border-2 rounded-lg ${
                    error.country ? "border-red-500" : "border-slate-200"
                  } focus:outline-none focus:ring-2 focus:ring-slate-400`}
                  value={country}
                  onChange={(e) => {
                    dispatch(setCountry(e.target.value));
                    dispatch(setError({ ...error, country: "" }));
                  }}
                />
                {error.country && (
                  <span className="text-xs text-red-500 mt-1 block">
                    {error.country}
                  </span>
                )}
              </div>
            </div>
            <div>
              <input
                type="text"
                placeholder="Phone"
                className={`w-full p-3 border-2 rounded-lg ${
                  error.phone ? "border-red-500" : "border-slate-200"
                } focus:outline-none focus:ring-2 focus:ring-slate-400`}
                value={phone}
                onChange={(e) => {
                  dispatch(setPhone(e.target.value));
                  dispatch(setError({ ...error, phone: "" }));
                  dispatch(setError({ ...error, phone: "" }));
                }}
              />
              {error.phone && (
                <span className="text-xs text-red-500 mt-1 block">
                  {error.phone}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Cart Totals and Payment Methods */}
        <div className="mt-6 md:mt-0">
          <div className="max-w-md mx-auto">
            <div className="text-left my-6">
              <h3 className="text-slate-700 font-outfit font-normal text-2xl sm:text-3xl">
                Cart{" "}
                <span className="text-black font-semibold relative after:content-[''] after:absolute after:w-8 after:h-px after:bg-black after:top-1/2 after:left-full after:ml-2">
                  Totals
                </span>
              </h3>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex justify-between font-outfit text-base text-stone-700 py-2">
                <p>Subtotal</p>
                <div className="flex items-center">
                  <FaNairaSign className="text-sm" />
                  <p>{new Intl.NumberFormat().format(subTotal)}</p>
                </div>
              </div>
              <div className="flex justify-between font-outfit text-base text-stone-700 py-2 border-y border-slate-200">
                <p>Shipping Fee</p>
                <div className="flex items-center">
                  <FaNairaSign className="text-sm" />
                  <p>{new Intl.NumberFormat().format(shippingFee)}</p>
                </div>
              </div>
              <div className="flex justify-between font-outfit text-xl font-bold text-stone-900 py-3">
                <p>Total</p>
                <div className="flex items-center">
                  <FaNairaSign className="text-base" />
                  <p>{new Intl.NumberFormat().format(total)}</p>
                </div>
              </div>
            </div>

            <div className="text-left my-6">
              <h3 className="text-slate-700 font-outfit font-normal text-2xl sm:text-3xl">
                Payment{" "}
                <span className="text-black font-semibold relative after:content-[''] after:absolute after:w-8 after:h-px after:bg-black after:top-1/2 after:left-full after:ml-2">
                  Method
                </span>
              </h3>
            </div>

            <div className="space-y-3">
              <label
                className={`flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                  paymentMethod === "stripe"
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-slate-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="stripe"
                    checked={paymentMethod === "stripe"}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      dispatch(setError({ ...error, paymentMethod: "" }));
                    }}
                    className="w-5 h-5 text-indigo-600"
                  />
                  <img
                    src={stripe_logo}
                    alt="Stripe payment"
                    className="w-16 h-auto"
                  />
                </div>
              </label>

              <label
                className={`flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                  paymentMethod === "paystack"
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-slate-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paystack"
                    checked={paymentMethod === "paystack"}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      dispatch(setError({ ...error, paymentMethod: "" }));
                    }}
                    className="w-5 h-5 text-indigo-600"
                  />
                  <img
                    src={paystack_logo}
                    alt="Paystack payment"
                    className="w-20 h-auto"
                  />
                </div>
              </label>

              <label
                className={`flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                  paymentMethod === "cod"
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-slate-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      dispatch(setError({ ...error, paymentMethod: "" }));
                    }}
                    className="w-5 h-5 text-indigo-600"
                  />
                  <div className="flex items-center gap-2">
                    <FaMoneyBillWave className="text-slate-700" />
                    <span className="text-sm font-outfit text-slate-700">
                      Cash on Delivery
                    </span>
                  </div>
                </div>
              </label>

              {error.paymentMethod && (
                <span className="text-xs text-red-500 block mt-2">
                  {error.paymentMethod}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 px-6 py-3 font-outfit font-medium text-base bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 disabled:bg-gray-500"
            >
              {isLoading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </form>
      <SuccessModal
        modalOpen={successModal}
        modalClose={() => setSuccessModal(false)}
        success={success}
      />
      <AlertModal
        modalOpen={alertModal}
        modalClose={() => setAlertModal(false)}
        message={error}
      />
    </div>
  );
}
