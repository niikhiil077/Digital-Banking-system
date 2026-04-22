import React, { useState } from "react";
import api from "../../../config/axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading";

const Upi = () => {
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState("");
  const [apiError, setApiError] = useState("");
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchResponse, setSearchResponse] = useState(null);
  const [searchResponseError, setSearchResponseError] = useState(null);
  const [searchResponsePay,setSearchResponsePay] = useState(null);
  const [upiId, setUpiId] = useState('');
  const navigate = useNavigate();
  const formSubmitted = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors("");
    setApiError("");
    console.log("form submitted");
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    if (isNaN(data.pin)) {
      setErrors("PIN must be 6 real digits positive number");
      setLoading(false);
      return;
    }

    if (!(Number(data.amount) > 0)) {
      setErrors("Amount must be greater than 0");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/transaction/upi", {
        recieverUPIid: data.recieverUPIid,
        pin: data.pin,
        amount: data.amount,
      });
      setResponse(response.data);
      setApiError("");
      setErrors("");
      setSearchResponse(null);
      setSearchResponseError(null);
      setSearchResponsePay(null);
      setSearch("");
      setUpiId("");
      e.target.reset();
    } catch (err) {
      console.log(err);
      console.log(err.response.data);
      setApiError(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const searchFormSubmitted = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearchResponse(null);
    setSearchResponseError(null);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await api.post("/service/search", {
        input: data.input,
      });
      setSearchResponse(response.data);
      console.log(response.data);
    } catch (err) {
      setSearchResponseError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}
      {Object.keys(response).length !== 0 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50 px-4">
          {/* Card */}
          <div className="w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white/40 rounded-3xl p-6 shadow-2xl animate-[fadeIn_.4s_ease]">
            {/* Success Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center text-white text-2xl shadow-lg animate-[scaleIn_.4s_ease]">
                ✓
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-center text-blue-900 mb-1">
              Payment Successful
            </h2>

            <p className="text-center text-sm text-blue-700 mb-6">
              Your transaction has been completed successfully.
            </p>

            {/* Amount */}
            <div className="text-center mb-6">
              <p className="text-sm text-blue-700">Amount Paid</p>
              <h1 className="text-3xl font-bold text-green-600">
                ₹ {response.amount}
              </h1>
            </div>

            {/* Details */}
            <div className="bg-white/60 border border-white/40 rounded-xl p-4 space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-blue-700">From</span>
                <span className="text-blue-900 font-medium">
                  {response.from}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-blue-700">To</span>
                <span className="text-blue-900 font-medium">{response.to}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-blue-700">Status</span>
                <span className="text-green-600 font-semibold">
                  {response.code}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              {/* OK */}
              <button
                onClick={() => setResponse({})}
                className="w-full py-3 rounded-xl text-white font-semibold
          bg-gradient-to-r from-sky-500 to-indigo-600
          shadow-lg hover:scale-[1.03] active:scale-[0.95] transition"
              >
                OK
              </button>

              {/* Back */}
              <button
                onClick={() => navigate("/")}
                className="text-xs text-blue-700 hover:underline text-center transition"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-200 to-indigo-200 relative overflow-hidden flex items-center justify-center px-4">
        {/* Background Glow */}
        <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-sky-400 opacity-40 blur-3xl rounded-full"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-indigo-500 opacity-40 blur-3xl rounded-full"></div>

        {/* Main Container */}

        <div className="relative w-full max-w-5xl flex flex-col items-center gap-8">
          {/* 🔷 Unified Search + Result Card */}
          <div className="w-full max-w-xl mx-auto mt-6">
            <div className="relative rounded-2xl bg-white/60 backdrop-blur-2xl border border-white/40 shadow-xl p-4 transition-all duration-300 hover:shadow-2xl">
              {/* 🔍 Search Form */}
              <form
                onSubmit={(e) => {
                  searchFormSubmitted(e);
                }}
                className="relative"
              >
                <input
                  type="text"
                  placeholder="Search User via UPI id or mobile Number..."
                  value={search}
                  name="input"
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-5 py-3 pr-24 rounded-xl bg-white/70 border border-white/40 text-blue-900 outline-none
        focus:ring-2 focus:ring-sky-400/50 focus:bg-white/90 transition-all duration-200 shadow-md placeholder:text-blue-400/70"
                />

                {/* Buttons */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                  {/* Search */}
                  <button
                    type="submit"
                    className="text-lg text-blue-500 opacity-80 hover:scale-110 hover:text-blue-700 transition-all duration-200"
                  >
                    🔍
                  </button>

                  {/* Cancel */}
                  {search.length !== 0 && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      className="text-lg text-red-500 hover:scale-110 hover:text-red-600 transition-all duration-200"
                    >
                      ✖
                    </button>
                  )}
                </div>
              </form>

              {/* Divider */}
              {(searchResponseError || searchResponse) && (
                <div className="my-4 h-[1px] bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
              )}

              {/* ❌ Error State */}
              {searchResponseError && (
                <div
                  className="flex items-center justify-between px-4 py-3 rounded-xl 
      bg-red-100/80 border border-red-300 text-red-700 shadow-sm animate-[fadeIn_0.3s_ease]"
                >
                  <span>{searchResponseError}</span>

                  {/* Close Error */}
                  <button
                    type="button"
                    onClick={() => setSearchResponseError(null)}
                    className="ml-3 text-red-500 hover:text-red-700 hover:scale-110 transition text-lg"
                  >
                    ✖
                  </button>
                </div>
              )}

              {/* ✅ Success State */}
              {!searchResponseError && searchResponse && (
                <div
                  className="flex items-center justify-between px-4 py-3 rounded-xl 
      bg-white/80 border border-white/40 shadow-md hover:shadow-lg transition-all duration-300 animate-[fadeIn_0.3s_ease]"
                >
                  {/* Left */}
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div
                      className="w-11 h-11 flex items-center justify-center rounded-full 
          bg-gradient-to-br from-sky-500 to-blue-600 text-white font-semibold text-lg shadow-md
          ring-2 ring-white/40"
                    >
                      {searchResponse.recieverName?.charAt(0).toUpperCase()}
                    </div>

                    {/* Name */}
                    <div className="flex flex-col leading-tight">
                      <span className="text-blue-900 font-semibold text-[15px]">
                        {searchResponse.recieverName}
                      </span>
                      <span className="text-xs text-blue-400">
                        Verified Receiver
                      </span>
                    </div>
                  </div>

                  {/* Right Buttons */}
                  <div className="flex items-center gap-2">
                    {/* Pay */}
                    <button
                      className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-semibold 
            shadow-md hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-200"
                      onClick={()=>{
                        setUpiId(searchResponse.recieverUPIid);
                      }}
                    >
                      Pay
                    </button>

                    {/* Close Result */}
                    <button
                      type="button"
                      onClick={() => setSearchResponse(null)}
                      className="text-gray-400 hover:text-red-500 hover:scale-110 transition text-lg"
                    >
                      ✖
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Main Content */}
          <div className="w-full grid md:grid-cols-2 gap-8 items-center">
            {/* LEFT INFO */}
            <div className="space-y-5 text-center md:text-left">
              <h1 className="text-3xl font-bold text-blue-900">UPI Transfer</h1>
              <p className="text-blue-700">
                Send money instantly with secure authentication.
              </p>

              <div className="space-y-3">
                <div className="bg-white/50 backdrop-blur-xl border border-white/40 rounded-2xl p-4 shadow-md">
                  <p className="text-blue-800 font-medium">
                    ⚡ Instant Transfer
                  </p>
                  <p className="text-sm text-blue-600">
                    Money is transferred within seconds.
                  </p>
                </div>

                <div className="bg-white/50 backdrop-blur-xl border border-white/40 rounded-2xl p-4 shadow-md">
                  <p className="text-blue-800 font-medium">🔐 Secure</p>
                  <p className="text-sm text-blue-600">
                    Protected with your 6-digit UPI PIN.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="bg-white/50 backdrop-blur-2xl border border-white/40 rounded-3xl p-6 shadow-xl w-full">
              <h2 className="text-lg font-semibold text-blue-900 mb-5">
                Send Money
              </h2>
              {apiError && (
                <div className="flex items-center gap-2 bg-red-50/70 backdrop-blur-xl border border-red-200 rounded-xl px-4 py-3 shadow-md animate-[fadeIn_.3s_ease]">
                  {/* Icon */}
                  <div className="text-red-500 text-lg ">⚠️</div>

                  {/* Content */}

                  <p className="text-sm font-semibold text-red-700">
                    {apiError}
                  </p>
                </div>
              )}

              <form
                onSubmit={(e) => {
                  formSubmitted(e);
                }}
                className="space-y-4 mt-[10px]"
              >
                {/* UPI ID */}
                <div>
                  <label className="text-sm text-blue-800 block mb-1">
                    Receiver UPI ID
                  </label>
                  <input
                    type="text"
                    name="recieverUPIid"
                    placeholder="example@okaxis"
                    value={upiId}
                    onChange={(e)=>{setUpiId(e.target.value)}}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/40 text-blue-900 outline-none
                  focus:ring-2 focus:ring-sky-400/50 transition"
                  />
                </div>

                {/* Amount */}
                <div>
                  <label className="text-sm text-blue-800 block mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Enter amount"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/40 text-blue-900 outline-none
                  focus:ring-2 focus:ring-sky-400/50 transition"
                  />
                </div>

                {/* PIN */}
                <div>
                  <label className="text-sm text-blue-800 block mb-1">
                    UPI PIN
                  </label>
                  <input
                    type="password"
                    name="pin"
                    minLength="6"
                    maxLength="6"
                    placeholder="6-digit PIN"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/40 text-blue-900 outline-none
                  focus:ring-2 focus:ring-sky-400/50 transition"
                  />

                  {/* Error UI (toggle later) */}
                  {errors !== "" && (
                    <p className="text-xs text-red-500 mt-1">{errors}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-white font-semibold
                bg-gradient-to-r from-sky-500 to-indigo-600
                shadow-lg hover:scale-[1.03] active:scale-[0.95] transition"
                >
                  Send Money
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Upi;
