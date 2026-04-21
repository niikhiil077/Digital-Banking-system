import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { setCardData } from "../../../context/features/carddata";
import Loading from "../../components/loading";
import SetCardPin from "./setCardPin";
import SetCardStatus from "./setCardStatus";

const Card = () => {
  const cardData = useSelector((state) => state.cardData.cardData);
  const [isLoading, setIsLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [isSetPinClicked, setisSetPinClicked] = useState(false);
  const [isSetStatusClicked, setisSetStatusClicked] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/service/getCardDetails");
        dispatch(setCardData(response.data));
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    })();
  });

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 relative overflow-hidden bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100">
      {/* Background Glows */}
      <div className="absolute top-[-150px] left-[-100px] w-[450px] h-[450px] rounded-full blur-[80px] opacity-50 bg-gradient-to-br from-sky-400 to-sky-500 animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-150px] right-[-100px] w-[450px] h-[450px] rounded-full blur-[80px] opacity-50 bg-gradient-to-br from-indigo-400 to-indigo-600 animate-pulse pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[80px] opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)",
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        @keyframes gradAnim {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes cardShine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes statusPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.5; transform:scale(0.75); }
        }
        .card-glow-border {
          background: linear-gradient(135deg,#38bdf8,#818cf8,#6366f1,#38bdf8);
          background-size: 300% 300%;
          animation: gradAnim 4s ease infinite;
        }
        .card-shine-layer {
          background: linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.05) 30%, rgba(147,197,253,0.08) 42%, rgba(255,255,255,0.05) 54%, transparent 64%);
          background-size: 200% 200%;
          animation: cardShine 5s ease infinite;
        }
        .card-tilt {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          transform-style: preserve-3d;
        }
        .card-tilt:hover {
          transform: rotateY(-4deg) rotateX(2deg) translateZ(8px);
          box-shadow: 0 30px 60px rgba(30,58,138,0.35), 0 0 40px rgba(56,189,248,0.12);
        }
        .glow-wrap:hover .card-glow-border {
          opacity: 1 !important;
          filter: blur(18px) !important;
        }
        .status-dot { animation: statusPulse 2s infinite; }
        .btn-sky { transition: all .2s; }
        .btn-sky:hover { box-shadow: 0 6px 24px rgba(14,165,233,0.45); transform: translateY(-1px); }
        .btn-sky:active { transform: translateY(0); }
        .btn-indigo-ctrl { transition: all .2s; }
        .btn-indigo-ctrl:hover { box-shadow: 0 6px 24px rgba(99,102,241,0.45); transform: translateY(-1px); }
        .btn-indigo-ctrl:active { transform: translateY(0); }
        .panel-card { transition: border-color .25s, box-shadow .25s; }
        .panel-card:hover { border-color: rgba(129,140,248,0.45) !important; box-shadow: 0 8px 32px rgba(79,70,229,0.08); }
        .radio-opt { transition: all .2s; }
        .radio-opt:hover { border-color: rgba(129,140,248,0.4) !important; background: rgba(255,255,255,0.7) !important; }
        .cvv-eye:hover { background: rgba(147,197,253,0.2) !important; border-color: rgba(147,197,253,0.5) !important; color: #bae6fd !important; }
        .btn-red { transition: all .2s; background: linear-gradient(135deg,#ef4444,#dc2626) !important; }
        .btn-red:hover { box-shadow: 0 6px 24px rgba(239,68,68,0.45); transform: translateY(-1px); background: linear-gradient(135deg,#f87171,#ef4444) !important; }
        .btn-red:active { transform: translateY(0); background: linear-gradient(135deg,#dc2626,#b91c1c) !important; }
      `}</style>

      {/* MAIN GRID */}
      <div className="relative z-10 w-full max-w-5xl grid md:grid-cols-2 gap-10 items-start">
        {/* ── LEFT: CARD ── */}
        <div className="flex flex-col items-center gap-5">
          

          {/* Card Wrap */}
          <div
            className="lg:fixed sm:sticky lg:mt-[23vh] md:mt-[23vh] w-full max-w-[380px] glow-wrap"
            style={{ perspective: 1000 }}
          >
            {/* Animated glow border */}
            <div
              className="card-glow-border absolute rounded-[22px] pointer-events-none"
              style={{
                inset: -2,
                opacity: 0.55,
                filter: "blur(14px)",
                transition: "opacity .3s, filter .3s",
                zIndex: 0,
              }}
            />

            {/* Card body */}
            <div
              className="relative rounded-[20px] p-7 overflow-hidden card-tilt"
              style={{
                minHeight: 220,
                zIndex: 1,
                background:
                  "linear-gradient(135deg,#1e3a8a 0%,#1e40af 45%,#1d4ed8 70%,#0369a1 100%)",
                border: "1px solid rgba(147,197,253,0.2)",
              }}
            >
              {/* Shine */}
              <div className="card-shine-layer absolute inset-0 rounded-[20px] pointer-events-none" />

              {/* Circuit pattern */}
              <div
                className="absolute bottom-0 right-0 pointer-events-none"
                style={{
                  width: 220,
                  height: 200,
                  opacity: 0.07,
                  backgroundImage:
                    "linear-gradient(0deg,rgba(147,197,253,1) 1px,transparent 1px),linear-gradient(90deg,rgba(147,197,253,1) 1px,transparent 1px)",
                  backgroundSize: "20px 20px",
                  maskImage:
                    "radial-gradient(circle at 80% 80%,black 0%,transparent 70%)",
                }}
              />

              {/* Header */}
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <p className="text-[10px] uppercase tracking-[3px] text-white/40 mb-1">
                    Virtual Debit Card
                  </p>
                  <p className="text-[17px] font-semibold text-white tracking-wide">
                    {cardData.name}
                  </p>
                </div>
                <div
                  className="flex items-center gap-[5px] px-3 py-[5px] rounded-full text-[10px] font-semibold tracking-widest uppercase"
                  style={
                    cardData.status === "Active"
                      ? {
                          background: "rgba(52,211,153,0.15)",
                          border: "1px solid rgba(52,211,153,0.35)",
                          color: "#6ee7b7",
                        }
                      : cardData.status === "Blocked"
                        ? {
                            background: "rgba(252,165,165,0.15)",
                            border: "1px solid rgba(252,165,165,0.35)",
                            color: "#fca5a5",
                          }
                        : {
                            background: "rgba(253,230,138,0.15)",
                            border: "1px solid rgba(253,230,138,0.35)",
                            color: "#fde68a",
                          }
                  }
                >
                  <span
                    className="status-dot w-[6px] h-[6px] rounded-full inline-block"
                    style={{ background: "currentColor" }}
                  />
                  {cardData.status}
                </div>
              </div>

              {/* Chip */}
              <div className="relative z-10 my-5">
                <div
                  className="relative overflow-hidden rounded-[6px]"
                  style={{
                    width: 44,
                    height: 34,
                    background:
                      "linear-gradient(135deg,#d4a84b,#f0c040,#c49030,#e8b840)",
                    border: "1px solid rgba(255,200,80,0.35)",
                    boxShadow:
                      "0 2px 8px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.2)",
                  }}
                >
                  <div
                    className="absolute top-1/2 left-0 right-0 -translate-y-1/2"
                    style={{ height: 1, background: "rgba(0,0,0,0.18)" }}
                  />
                  <div
                    className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2"
                    style={{ width: 1, background: "rgba(0,0,0,0.18)" }}
                  />
                </div>
              </div>

              {/* Card Number */}
              <div
                className="relative z-10 text-white font-bold tracking-[4px]"
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: 18,
                  textShadow: "0 0 20px rgba(147,197,253,0.35)",
                }}
              >
                {cardData.cardNo?.replace(/(.{4})/g, "$1 ").trim()}
              </div>

              {/* Footer */}
              <div className="relative z-10 flex justify-between items-end mt-5">
                <div>
                  <p className="text-[9px] uppercase tracking-[2px] text-white/40 mb-[3px]">
                    Expires
                  </p>
                  <p
                    className="text-white font-bold tracking-[2px]"
                    style={{
                      fontFamily: "'Space Mono',monospace",
                      fontSize: 13,
                    }}
                  >
                    {new Date(cardData.exp).toLocaleDateString("en-GB", {
                      month: "2-digit",
                      year: "2-digit",
                    })}
                  </p>
                </div>

                {/* CVV */}
                <div className="flex items-center gap-2">
                  <div>
                    <p className="text-[9px] uppercase tracking-[2px] text-white/40 mb-[3px]">
                      CVV
                    </p>
                    <p
                      className="text-white font-bold tracking-[2px]"
                      style={{
                        fontFamily: "'Space Mono',monospace",
                        fontSize: 13,
                      }}
                    >
                      {isClicked ? cardData.cvv : "•••"}
                    </p>
                  </div>
                  <button
                    className="cvv-eye flex items-center justify-center rounded-full transition-all"
                    onClick={() => {
                      setIsClicked(true);
                      setTimeout(() => setIsClicked(false), 10000);
                    }}
                    style={{
                      width: 28,
                      height: 28,
                      flexShrink: 0,
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "rgba(255,255,255,0.6)",
                      cursor: "pointer",
                    }}
                  >
                    {isClicked ? (
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Network logo */}
                <div className="flex">
                  <div
                    className="w-[30px] h-[30px] rounded-full"
                    style={{
                      background: "#eb001b",
                      marginRight: -10,
                      opacity: 0.85,
                    }}
                  />
                  <div
                    className="w-[30px] h-[30px] rounded-full"
                    style={{ background: "#f79e1b", opacity: 0.85 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: CONTROLS ── */}
        <div className="flex flex-col gap-5">
          {/* Heading */}
          <div>
            <h2 className="text-[26px] font-bold text-blue-900 tracking-tight">
              Card Controls
            </h2>
            <p className="text-[13px] text-slate-400 mt-1">
              Manage your virtual banking card
            </p>
            <div className="mt-3 h-[3px] w-10 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500" />
          </div>

          <SetCardPin
            isSetPinClicked={isSetPinClicked}
            setisSetPinClicked={setisSetPinClicked}
          />

          <SetCardStatus
            isSetStatusClicked={isSetStatusClicked}
            setisSetStatusClicked={setisSetStatusClicked}
          />

          {/* Info Strip */}
          <div
            className="flex items-center gap-3 px-5 py-4 rounded-[12px] backdrop-blur-sm"
            style={{
              background: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(147,197,253,0.3)",
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="2"
              strokeLinecap="round"
              className="shrink-0"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-[12px] text-slate-500">
              <strong className="text-blue-900">256-bit encrypted.</strong> CVV
              hidden by default. Real-time fraud monitoring active.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
