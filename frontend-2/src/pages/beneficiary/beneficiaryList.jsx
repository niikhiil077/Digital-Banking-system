import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setbeneficiaryList,
  setShowBeneficiaries,
} from "../../../context/beneficiary/beneficiary";
import { useNavigate } from "react-router-dom";

const BeneficiaryList = ({ setLoading }) => {
  const navigate = useNavigate();
  const showBeneficiaries = useSelector(
    (state) => state.beneficiaryData.showBeneficiaries,
  );
  const beneficiaryList = useSelector(
    (state) => state.beneficiaryData.beneficiaryList,
  );
  const dispatch = useDispatch();
  return (
    <div>
      {/* Beneficiary List Section */}
      {showBeneficiaries && (
        <div className="mb-8 bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-lg animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-blue-900">
              Select Beneficiary
            </h3>
            <button
              type="button"
              onClick={() => {
                dispatch(setbeneficiaryList([]));
                dispatch(setShowBeneficiaries(false));
              }}
              className="cursor-pointer text-blue-600 hover:text-blue-900 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {beneficiaryList.length > 0 ? (
              <div className="col-span-full space-y-3">
                {beneficiaryList.map((item) => (
                  <div
                    key={item._id}
                    className="group relative flex items-center justify-between bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl px-5 py-4 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-[2px]"
                  >
                    {/* Left Section (same style as before) */}
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="h-11 w-11 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-semibold shadow-md">
                        {item.recieverName.charAt(0)}
                      </div>

                      {/* Name ONLY */}
                      <div>
                        <h2 className="text-[14px] font-semibold text-gray-800">
                          {item.recieverName}
                        </h2>
                      </div>
                    </div>

                    {/* Pay Button (same feel) */}
                    <button
                      onClick={() => {
                        navigate("/beneficiary", {
                          state: {
                            bankId: item.recieverBankId,
                            recieverName: item.recieverName,
                          },
                        });
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-white 
                bg-gradient-to-r from-indigo-600 to-purple-600 
                hover:from-indigo-700 hover:to-purple-700 
                active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                      Pay
                    </button>

                    {/* Hover Glow (same as before) */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none bg-gradient-to-r from-indigo-500/10 to-purple-500/10"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16 px-6 bg-white/70 backdrop-blur-md border border-dashed border-gray-300 rounded-2xl text-center">
                <div className="h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg mb-4">
                  +
                </div>

                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  No Beneficiaries Found
                </h2>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BeneficiaryList;
