import React from "react";

const SetCardStatus = ({isSetStatusClicked,setisSetStatusClicked}) => {
     const setCardStatusClicked = () => {
    console.log("set card status clicked");
  };
  return (
    <>
      {/* ── STATUS PANEL ── */}
      <div
        className="panel-card rounded-2xl overflow-hidden backdrop-blur-md"
        style={{
          background: "rgba(255,255,255,0.7)",
          border: "1px solid rgba(147,197,253,0.3)",
        }}
      >
        <div
          className="flex items-center gap-3 px-5 py-4"
          style={{ borderBottom: "1px solid rgba(147,197,253,0.2)" }}
        >
          <div
            className="flex items-center justify-center rounded-[10px] shrink-0"
            style={{
              width: 36,
              height: 36,
              background: "rgba(129,140,248,0.12)",
              border: "1px solid rgba(129,140,248,0.25)",
            }}
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#818cf8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <div>
            <p className="text-[14px] font-semibold text-blue-900">
              Card Status
            </p>
            <p className="text-[12px] text-slate-400 mt-[1px]">
              Activate, pause, or block your card
            </p>
          </div>
        </div>

        {isSetStatusClicked && (
          <div
            className="px-5 py-4 flex flex-col gap-2"
            style={{ borderBottom: "1px solid rgba(147,197,253,0.2)" }}
          >
            {[
              {
                value: "Active",
                badge: "Live",
                style: {
                  background: "rgba(52,211,153,0.12)",
                  color: "#059669",
                  border: "1px solid rgba(52,211,153,0.3)",
                },
              },
              {
                value: "Inactive",
                badge: "Paused",
                style: {
                  background: "rgba(251,191,36,0.12)",
                  color: "#b45309",
                  border: "1px solid rgba(251,191,36,0.3)",
                },
              },
              {
                value: "Blocked",
                badge: "Locked",
                style: {
                  background: "rgba(252,165,165,0.12)",
                  color: "#dc2626",
                  border: "1px solid rgba(252,165,165,0.3)",
                },
              },
            ].map((opt) => (
              <label
                key={opt.value}
                className="radio-opt flex items-center justify-between px-4 py-3 rounded-[10px] cursor-pointer"
                style={{
                  border: "1px solid rgba(147,197,253,0.25)",
                  background: "rgba(255,255,255,0.4)",
                }}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="cardStatus"
                    value={opt.value}
                    className="accent-indigo-500 w-4 h-4 cursor-pointer"
                  />
                  <span className="text-[13px] font-medium text-blue-900">
                    {opt.value}
                  </span>
                </div>
                <span
                  className="text-[10px] font-semibold tracking-wide px-2 py-[3px] rounded-full"
                  style={opt.style}
                >
                  {opt.badge}
                </span>
              </label>
            ))}
          </div>
        )}

        <div className="px-5 py-3 flex gap-3">
          {isSetStatusClicked && (
            <button
              onClick={() => setisSetStatusClicked(false)}
              className="btn-red flex-1 flex items-center justify-center gap-2 py-[10px] rounded-[10px] text-[13px] font-semibold text-white"
              style={{
                boxShadow: "0 4px 16px rgba(239,68,68,0.3)",
                border: "none",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Cancel
            </button>
          )}
          <button
            onClick={(e) => {
              isSetStatusClicked === true && setCardStatusClicked(e);
              isSetStatusClicked === false && setisSetStatusClicked(true);
            }}
            className="btn-indigo-ctrl flex-1 flex items-center justify-center gap-2 py-[10px] rounded-[10px] text-[13px] font-semibold text-white"
            style={{
              background: "linear-gradient(135deg,#6366f1,#4f46e5)",
              boxShadow: "0 4px 16px rgba(99,102,241,0.3)",
              border: "none",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isSetStatusClicked ? (
                <polyline points="20 6 9 17 4 12" />
              ) : (
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              )}
            </svg>
            {isSetStatusClicked ? "Apply" : "Change Status"}
          </button>
        </div>
      </div>
    </>
  );
};

export default SetCardStatus;
