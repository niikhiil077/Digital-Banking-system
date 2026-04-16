import React from 'react'
import { Link } from 'react-router-dom'

const NotLogin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-200 to-indigo-200 relative overflow-hidden flex flex-col justify-between">

      {/* Background Glow */}
      <div className="absolute top-[-120px] left-[-120px] w-[28rem] h-[28rem] bg-sky-400/40 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[28rem] h-[28rem] bg-indigo-500/40 blur-[120px] rounded-full"></div>

      

      {/* Hero Section */}
      <div className="relative px-10 py-16 flex flex-col items-center text-center">

        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 tracking-tight leading-tight max-w-3xl">
          Secure Your Money. <br />
          <span className="text-indigo-600">Control Your Future.</span>
        </h1>

        <p className="mt-6 text-lg text-blue-700 max-w-xl opacity-90">
          VaultX gives you complete control over your finances with real-time tracking, instant transfers, and secure banking experience.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-6 mt-10">
          <Link to="/signin">
            <button className="px-8 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-sky-500 to-indigo-600 shadow-xl hover:scale-[1.07] hover:shadow-2xl transition">
              Get Started →
            </button>
          </Link>

          <Link to="/signup">
            <button className="px-8 py-3 rounded-xl font-semibold border border-white/40 bg-white/40 backdrop-blur-md hover:bg-white/60 transition">
              Create Account
            </button>
          </Link>
        </div>

      </div>

      {/* Features Section */}
      <div className="px-10 pb-16 grid md:grid-cols-3 gap-8">

        {[
          { title: "Instant Transfers", desc: "Send money anywhere instantly with zero friction." },
          { title: "Full Control", desc: "Track your balance and transactions in real-time." },
          { title: "Secure Banking", desc: "Advanced security to keep your money safe." }
        ].map((item, i) => (
          <div key={i} className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

            <div className="text-4xl mb-3">💎</div>

            <h3 className="text-lg font-semibold text-blue-900">
              {item.title}
            </h3>

            <p className="text-sm text-blue-700 mt-2 opacity-80">
              {item.desc}
            </p>
          </div>
        ))}

      </div>

      {/* Footer */}
      <div className="text-center text-blue-700 text-sm pb-6 opacity-80">
        VaultX • Secure • Fast • Reliable
      </div>

    </div>
  )
}

export default NotLogin;