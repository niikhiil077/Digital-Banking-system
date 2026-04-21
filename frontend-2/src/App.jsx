import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar/navbar";
import SignIn from "./components/login/login";
import ProtectedRoutes from "./components/protectedRoutes";
import Signup from "./components/signup/signup";
import Home from "./pages/home";
import Account from "./pages/account";
import Transaction from "./pages/transaction";
import Profile from "./pages/profile";
import SendMoney from "./pages/SendMoney";
import BankTransfer from "./pages/bankTransfer";
import TransferSuccess from "./pages/transferSuccess";
import Credit from "./pages/credit";
import Debit from "./pages/debit";
import { Route, Routes } from "react-router-dom";
import NotLogin from "./pages/notLogin";
import Card from "./pages/card/card";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn } from "../context/authentication/authData";
import Loading from "./components/loading";

const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(setIsLoggedIn(true));
    }
    setIsLoading(false);
  }, []);

  // Show nothing while checking for token on page load/refresh
  if (isLoading) {
    return <Loading/>;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Send-Money" element={<SendMoney />} />
          <Route path="/Bank-Transfer" element={<BankTransfer />} />
          <Route path="/transfer-success" element={<TransferSuccess />} />
          <Route path="/credit" element={<Credit />} />
          <Route path="/debit" element={<Debit />} />
          <Route path="/Card" element={<Card />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
