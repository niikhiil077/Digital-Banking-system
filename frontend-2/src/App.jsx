import React from "react";
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
import AlreadyLogin from "./components/alreadyLogin";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/new-user" element={<AlreadyLogin />} />

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
        </Route>
      </Routes>
    </>
  );
};

export default App;
