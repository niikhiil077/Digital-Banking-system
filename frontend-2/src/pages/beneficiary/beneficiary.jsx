import React from "react";
import api from "../../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { setbeneficiaryList, setShowBeneficiaries } from "../../../context/beneficiary/beneficiary";

const Beneficiary = ({setLoading}) => {
 
  const dispatch = useDispatch();
  const payBenClicked = async () => {
    setLoading(true);
    dispatch(setShowBeneficiaries(true));
    try {
      const response = await api.get("/service/getBeneficiary-list");
      dispatch(setbeneficiaryList(response.data));
    } catch (err) {
      console.log(err.response.data);
    }finally{
        setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex items-center gap-4 flex-wrap justify-end">
        <div className="text-sm text-blue-700">Secure • Fast • Reliable</div>
        <button
          type="button"
          onClick={payBenClicked}
          className="px-5 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-[1.02] transition active:scale-[0.98]"
        >
          Pay Beneficiary
        </button>
      </div>
    </div>
  );
};

export default Beneficiary;
