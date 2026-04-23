import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import Loading from "../components/loading";
import { useNavigate } from "react-router-dom";

const Transaction = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get("/service/getAllTransaction");
        setUsers(res.data);
        console.log(res.data);
      } catch (err) {
        alert(err?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const btnClicked = (accNo,name) => {
    navigate(`/transaction/${name}`, {
      state: accNo,
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-200 to-indigo-200 relative overflow-hidden px-4 py-10">
      {/* Background Glow */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-sky-400 opacity-40 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-indigo-500 opacity-40 blur-3xl rounded-full"></div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-900">Transactions</h1>
          <p className="text-blue-700 mt-1">
            View users and explore their transaction history
          </p>
        </div>

        {/* Empty State */}
        {users.length === 0 && (
          <div className="text-center text-blue-700 bg-white/50 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-md">
            No transactions found.
          </div>
        )}

        {/* Users List */}
        <div className="space-y-4">
          {users.map((user, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white/50 backdrop-blur-xl border border-white/40 rounded-2xl p-4 shadow-lg hover:shadow-2xl hover:scale-[1.01] transition"
            >
              {/* Left Section */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg shadow-md">
                  {user.name?.charAt(0)}
                </div>

                {/* Info */}
                <div>
                  <p className="text-blue-900 font-semibold">{user.name}</p>
                </div>
              </div>

              {/* Right Button */}
              <button
                className="px-4 py-2 rounded-xl text-sm font-semibold text-white
                bg-gradient-to-r from-sky-500 to-indigo-600
                shadow-md hover:scale-[1.05] active:scale-[0.95] transition"
                onClick={() => {
                  btnClicked(user.accountNumber,user.name);
                }}
              >
                View History →
              </button>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        {users.length > 0 && (
          <p className="text-center text-xs text-blue-600 mt-8">
            Select a user to view detailed transaction history.
          </p>
        )}
      </div>
    </div>
  );
};

export default Transaction;
