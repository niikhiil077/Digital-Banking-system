import axios from "axios";
import React, { useEffect, useState } from "react";
import NotLogin from "./notLogin";
import Loading from "../components/loading";

const Account = () => {
  const [error, setError] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [accountDetails, setAccountDetails] = useState({});
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const AT = localStorage.getItem("accessToken");
    (async () => {
      if (!AT) {
        setIsVerified(false);
        setLoading(false);
        return;
      }
      setAccessToken(AT);
      console.log("useeffect1");
    })();
  }, []);

  useEffect(() => {
    if (!accessToken) {
      console.log("accesstoken not found");
      setIsVerified(false);
      return;
    }

    (async () => {
      try {
        const response = await axios.get("/api/service/user-details", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("fetched response");

        setAccountDetails(response.data);
        console.log(response.data);
        setIsVerified(true);
        setLoading(false);
      } catch (err) {
        setError(err?.response?.data?.message || "Internal Errors");
        console.log("Accesstoken expired", err);
        setIsVerified(false);
        setLoading(false);
      }
      console.log("useeffect2");
    })();
  }, [accessToken]);

  if (loading === true) {
    return <Loading />;
  }

  if (isVerified === true && loading === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-200 to-indigo-200 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-sky-400 opacity-40 blur-3xl rounded-full"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-indigo-500 opacity-40 blur-3xl rounded-full"></div>

        {/* Header */}
        <div className="px-10 py-8">
          <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">
            Account Details
          </h1>
          <p className="text-blue-700 mt-2">
            Manage and review your banking information
          </p>
        </div>

        {/* Main Card */}
        <div className="px-10 pb-10">
          <div className="bg-white/40 backdrop-blur-2xl border border-white/30 rounded-[2rem] shadow-2xl p-8 space-y-10">
            {/* User Info */}
            <div>
              <h2 className="text-xl font-semibold text-blue-900 mb-6">
                Personal Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/70 p-5 rounded-xl border border-white/40 hover:scale-[1.02] transition">
                  <p className="text-sm text-blue-600">Full Name</p>
                  <p className="text-lg font-semibold text-blue-900">
                    {accountDetails?.user?.name}
                  </p>
                </div>

                <div className="bg-white/70 p-5 rounded-xl border border-white/40 hover:scale-[1.02] transition">
                  <p className="text-sm text-blue-600">Mobile Number</p>
                  <p className="text-lg font-semibold text-blue-900">
                    {accountDetails?.user?.mobileNo}
                  </p>
                </div>

                <div className="bg-white/70 p-5 rounded-xl border border-white/40 hover:scale-[1.02] transition">
                  <p className="text-sm text-blue-600">Email Address</p>
                  <p className="text-lg font-semibold text-blue-900">
                    {accountDetails?.user?.email}
                  </p>
                </div>

                <div className="bg-white/70 p-5 rounded-xl border border-white/40 hover:scale-[1.02] transition">
                  <p className="text-sm text-blue-600">Branch</p>
                  <p className="text-lg font-semibold text-blue-900">
                    {accountDetails?.user?.branch}
                  </p>
                </div>

                <div className="bg-white/70 p-5 rounded-xl border border-white/40 hover:scale-[1.02] transition">
                  <p className="text-sm text-blue-600">Account Type</p>
                  <p className="text-lg font-semibold text-blue-900 capitalize">
                    {accountDetails?.user?.accType}
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-white/40"></div>

            {/* Bank Info */}
            <div>
              <h2 className="text-xl font-semibold text-blue-900 mb-6">
                Bank Details
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/70 p-5 rounded-xl border border-white/40 hover:scale-[1.02] transition">
                  <p className="text-sm text-blue-600">Account Number</p>
                  <p className="text-lg font-semibold text-blue-900 tracking-wider">
                    {accountDetails?.bank?.accNo}
                  </p>
                </div>

                <div className="bg-white/70 p-5 rounded-xl border border-white/40 hover:scale-[1.02] transition">
                  <p className="text-sm text-blue-600">IFSC Code</p>
                  <p className="text-lg font-[500] text-blue-900">
                    {accountDetails?.bank?.IFSCcode}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 text-white p-6 rounded-xl shadow-xl col-span-full hover:scale-[1.02] transition">
                  <p className="text-sm opacity-80">Available Balance</p>

                  <h3 className="text-4xl font-bold mt-2">
                    ₹ {accountDetails?.bank?.balance}
                  </h3>

                  <p className="text-xs opacity-70 mt-1">Real-time balance</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-blue-700 text-sm pb-6 opacity-80">
          VaultX • Secure Account Overview
        </div>
      </div>
    );
  }

  if (loading === false && isVerified === false) {
    return <NotLogin />;
  }
};

export default Account;
