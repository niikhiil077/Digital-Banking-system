import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import api from "../../config/axios";
import Loading from "../components/loading";

const UserTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useParams();

  const accNo = location.state;

  useEffect(() => {
    if (!accNo) {
      navigate("/", { replace: true });
      return;
    }

    setLoading(true);

    (async () => {
      try {
        const res = await api.post("/service/getTransaction", {
          recieverAccNo: accNo,
        });
        setResponse(res.data);
      } catch (err) {
        alert(err?.response?.data?.message || "Internal Error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-200 to-indigo-200 relative overflow-hidden px-4 py-10">
      {/* Glow BG */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-sky-400 opacity-40 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-indigo-500 opacity-40 blur-3xl rounded-full"></div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="relative bg-white/50 backdrop-blur-2xl border border-white/40 rounded-3xl p-6 shadow-xl flex items-center justify-between flex-wrap gap-4">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white text-xl font-semibold shadow-lg">
                {user?.charAt(0)}
              </div>

              {/* Name + Subtitle */}
              <div>
                <h1 className="text-xl font-semibold text-blue-900 tracking-tight">
                  {user}
                </h1>
                <p className="text-sm text-blue-600">Transaction Overview</p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col items-end gap-2">
              {/* Account Chip */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/70 border border-white/40 shadow-sm">
                <span className="text-blue-500 text-sm">🏦</span>
                <span className="text-blue-900 text-sm font-medium tracking-wide">
                  {accNo}
                </span>
              </div>

              {/* Subtext */}
              <p className="text-xs text-blue-500">
                Secure banking • Real-time updates
              </p>
            </div>

            {/* Glow Accent */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-400 opacity-20 blur-2xl rounded-full"></div>
          </div>
        </div>

        {/* No Data */}
        {response?.length === 0 && (
          <div className="text-center bg-white/50 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-md text-blue-700">
            No transactions found.
          </div>
        )}

        {/* Transactions */}
        <div className="space-y-4">
          {response?.map((tx, i) => (
            <div
              key={i}
              className="group relative overflow-hidden
    bg-white/60 backdrop-blur-2xl border border-white/40 rounded-3xl p-5
    shadow-lg hover:shadow-2xl transition-all duration-300
    hover:scale-[1.02] hover:-translate-y-1"
            >
              {/* Glow Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition"></div>

              <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
                {/* LEFT */}
                <div className="flex items-center gap-4">
                  {/* Animated Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white text-2xl shadow-lg
        group-hover:rotate-6 group-hover:scale-110 transition duration-300"
                  >
                    💳
                  </div>

                  {/* Info */}
                  <div className="space-y-1">
                    <p className="text-blue-900 font-semibold text-lg tracking-tight">
                      ₹ {tx.amount}
                    </p>

                    <p className="text-sm text-blue-700 font-medium flex items-center gap-1">
                      {tx.transactionMethod}
                      {tx.transactionMode && (
                        <span className="text-blue-400 text-xs">
                          • {tx.transactionMode}
                        </span>
                      )}
                    </p>

                    <p className="text-xs text-blue-500">
                      Sent to{" "}
                      <span className="font-medium">{tx.toAccount?.accNo}</span>
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col items-end gap-3">
                  {/* Status Badge */}
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide
          flex items-center gap-1
          ${
            tx.status === "success"
              ? "bg-green-100 text-green-600 shadow-sm"
              : "bg-red-100 text-red-600 shadow-sm"
          }`}
                  >
                    <span>{tx.status === "success" ? "✔" : "✖"}</span>
                    {tx.status}
                  </span>

                  {/* CTA */}
                </div>
              </div>

              {/* Bottom subtle divider animation */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-sky-500 to-indigo-600 group-hover:w-full transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {response?.length > 0 && (
          <p className="text-center text-xs text-blue-600 mt-8">
            Showing recent transactions
          </p>
        )}
      </div>
    </div>
  );
};

export default UserTransaction;
