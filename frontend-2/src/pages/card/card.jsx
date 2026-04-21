import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { setCardData } from "../../../context/features/carddata";
import Loading from "../../components/loading";

const Card = () => {
  const cardData = useSelector((state) => state.cardData.cardData);
  const [isLoading, setIsLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/service/getCardDetails");
        dispatch(setCardData(response.data));
      } catch (err) {
        console.log(err.response.data);
      } finally {
        setIsLoading(false);
      }
    })();
  });

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100 px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-120px] left-[-120px] w-[30rem] h-[30rem] bg-sky-400/30 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[30rem] h-[30rem] bg-indigo-500/30 blur-3xl rounded-full animate-pulse"></div>

      {/* Main Wrapper */}
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* LEFT: Virtual Card */}
        <div className="relative group transition-all duration-500 hover:scale-[1.02]">
          {/* Glow Border (animated) */}
          <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 rounded-3xl blur-2xl opacity-40 group-hover:opacity-70 transition-all duration-700 animate-pulse"></div>

          {/* Card */}
          <div className="relative rounded-3xl p-6 h-64 text-white shadow-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 border border-white/30 overflow-hidden transition-all duration-500 hover:shadow-blue-400/40">
            {/* Moving Shine */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 opacity-40 animate-[pulse_3s_ease-in-out_infinite]"></div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_white_1px,_transparent_1px)] [background-size:20px_20px] animate-pulse"></div>

            {/* Top Row */}
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-xs text-white/70 tracking-wide">
                  Virtual Debit Card
                </p>
                <p className="text-lg font-semibold mt-1 tracking-wide">
                  {cardData.name}
                </p>
              </div>

              {/* Status Badge */}
              <div
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-300 hover:scale-105 flex items-center gap-2
  ${
    cardData.status === "Active"
      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-700"
      : cardData.status === "Blocked"
        ? "bg-gradient-to-r from-red-500 to-rose-600 text-white border-red-700"
        : "bg-gradient-to-r from-yellow-400 to-amber-500 text-black border-yellow-600"
  }`}
              >
                {/* ICONS */}

                {cardData.status === "Active" && <span>✔</span>}
                {cardData.status === "Blocked" && <span>⛔</span>}
                {cardData.status === "Inactive" && <span>⚠</span>}

                {cardData.status}
              </div>
            </div>

            {/* Card Number */}
            <div className="mt-10 tracking-widest text-xl font-mono relative z-10 transition-all duration-300 hover:tracking-[0.3em]">
              {cardData.cardNo?.replace(/(.{4})/g, "$1 ")}
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-5 left-6 right-6 flex justify-between text-xs text-white/80 z-10">
              <div className="hover:translate-y-[-2px] transition">
                <p className="text-white/60">EXP</p>
                <p>
                  {new Date(cardData.exp).toLocaleDateString("en-GB", {
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </p>
              </div>

              {/* CVV with Eye */}
              <div className="flex items-center gap-2 group/cvv">
                <div className="transition group-hover/cvv:scale-105">
                  <p className="text-white/60">CVV</p>
                  <p className="tracking-widest">
                    {isClicked ? cardData.cvv : "***"}
                  </p>
                </div>

                {/* Eye Icon */}
                <button
                  onClick={() => {
                    setIsClicked(true);
                    setTimeout(() => {
                      setIsClicked(false);
                    }, 10000);
                  }}
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-90 shadow-md">
                    👁️
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Controls */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 tracking-tight">
              Card Controls
            </h2>
            <p className="text-blue-700 text-sm mt-1">
              Manage your virtual banking card securely
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-blue-300/50 hover:scale-[1.04] active:scale-95 transition-all duration-300">
              Set / Update UPI PIN
            </button>

            <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold shadow-lg hover:shadow-indigo-300/50 hover:scale-[1.04] active:scale-95 transition-all duration-300">
              Change Card Status
            </button>

            {/* 🔴 DANGER BLOCK CARD */}
            <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold shadow-lg hover:shadow-red-400/50 hover:scale-[1.04] active:scale-95 transition-all duration-300 relative overflow-hidden group">
              {/* danger glow sweep */}
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              ⚠ Block Card
            </button>
          </div>

          {/* Info Box */}
          <div className="p-5 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/40 text-sm text-blue-800 space-y-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <p className="hover:translate-x-1 transition">
              • Secure virtual card for online transactions
            </p>
            <p className="hover:translate-x-1 transition">
              • CVV is hidden by default for safety
            </p>
            <p className="hover:translate-x-1 transition">
              • Instant status updates from backend
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
