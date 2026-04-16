import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  const personalDetails = useSelector((state) => state.userData.personalDetails);

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-200 to-indigo-200 relative overflow-hidden">

      {/* Neon Glow Background */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-sky-400 opacity-40 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-indigo-500 opacity-40 blur-3xl rounded-full"></div>

      {/* Navbar */}
      <div className="relative flex justify-between items-center px-8 py-5 backdrop-blur-xl bg-white/40 border-b border-white/30">
        <h1 className="text-2xl font-bold tracking-wide text-blue-900">VaultX</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-blue-700">Dashboard</span>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 flex items-center justify-center text-white font-semibold shadow-xl ring-2 ring-white/50">
            {personalDetails?.name?.charAt(0) || 'U'}
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="px-8 py-10 relative">
        <h2 className="text-4xl font-bold text-blue-900 mb-2 tracking-tight">
          Welcome {personalDetails?.name ? `back , ${personalDetails.name}` : 'new User'}
        </h2>
        <p className="text-blue-700 text-lg">Your money. Your control. Your power.</p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8 px-8 relative">

        {/* Balance */}
        <div className="relative p-6 rounded-3xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 text-white shadow-2xl overflow-hidden hover:scale-[1.03] transition">

          <div className="absolute inset-0 bg-white/10 backdrop-blur-xl"></div>

          <div className="relative z-10 space-y-4">

            {/* Top Row */}
            <div className="flex justify-between items-center">
              <p className="text-sm opacity-80">Current Balance</p>

              {/* Eye Icon (UI only) */}
              <div className="cursor-pointer text-xl opacity-80 hover:opacity-100 transition">
                👁️
              </div>
            </div>

            {/* Hidden Balance */}
            <h3 className="text-5xl font-bold tracking-tight flex gap-3 items-center">
              ₹ <p className='font-[500] text-4xl'>XXXX</p>
            </h3>

            {/* Button */}
            <button className="mt-2 px-4 py-2 text-sm rounded-lg bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition">
              Check Balance
            </button>

            <p className="text-xs opacity-70">Tap to reveal your balance</p>
          </div>
        </div>

        {/* Credit / Debit */}
        <div className="bg-white/50 backdrop-blur-2xl p-6 rounded-3xl border border-white/40 shadow-xl hover:shadow-2xl transition">
          <h3 className="text-lg font-semibold mb-4 text-blue-900">Money Flow</h3>
          <div className="space-y-4">
            <div className="flex justify-between bg-white/70 p-4 rounded-xl border border-white/40">
              <span className="text-blue-700">Credit</span>
              <span className="text-green-500 font-semibold text-lg">+ ₹0</span>
            </div>
            <div className="flex justify-between bg-white/70 p-4 rounded-xl border border-white/40">
              <span className="text-blue-700">Debit</span>
              <span className="text-red-500 font-semibold text-lg">- ₹0</span>
            </div>
          </div>
        </div>

        {/* Transfer */}
        <div className="bg-white/50 backdrop-blur-2xl p-6 rounded-3xl border border-white/40 shadow-xl hover:shadow-2xl hover:scale-[1.03] transition">
          <h3 className="text-lg font-semibold mb-4 text-blue-900">Bank Transfer</h3>
          <p className="text-blue-700 text-sm mb-4">Instantly send money anywhere.</p>
          <Link to='/transactions'>
            <button className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-sky-500 to-indigo-600 shadow-lg hover:scale-[1.03] active:scale-[0.95] transition">
              Transfer Now
            </button>
          </Link>
        </div>
      </div>

      {/* Actions */}
      <div className="px-8 mt-12">
        <h3 className="text-xl font-semibold text-blue-900 mb-5">Quick Actions</h3>

        <div className="grid md:grid-cols-4 gap-6">
          {["Send-Money", "Account", "Bank-Transfer", "Transactions"].map((item, i) => (
            <Link to={item} > <div key={i} className="group cursor-pointer bg-white/50 backdrop-blur-xl border border-white/40 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl hover:-translate-y-1 transition">
              <div className="text-3xl mb-2 group-hover:scale-110 transition">💳</div>
              <p className="text-blue-800 font-medium">{item}</p>
            </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Transactions */}
      <div className="px-8 mt-12">
        <h3 className="text-xl font-semibold text-blue-900 mb-5">Recent Transactions</h3>

        <Link to='/transactions'>
          <div className="bg-white/50 backdrop-blur-2xl rounded-3xl border border-white/40 p-6 shadow-xl">
            <div className="flex justify-between items-center bg-white/70 p-4 rounded-xl border border-white/40 hover:scale-[1.01] transition">
              <div>
                <p className="font-semibold text-blue-900">No transactions yet</p>
                <p className="text-xs text-blue-600">Start using your account</p>
              </div>
              <span className="text-blue-400">—</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Footer */}
      <div className="text-center text-blue-700 text-xs mt-16 pb-6">
        VaultX • Next Gen Banking Experience
      </div>
    </div >
  );
};

export default Home;