import React from 'react'
import { Link } from 'react-router-dom'

const NotLogin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-200 to-indigo-200 relative overflow-hidden flex flex-col justify-between">

      {/* Background Glow (softened) */}
      <div className="absolute top-[-120px] left-[-120px] w-[26rem] h-[26rem] bg-sky-400/30 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[26rem] h-[26rem] bg-indigo-500/30 blur-[120px] rounded-full"></div>

      {/* Hero */}
      <div className="relative px-6 md:px-12 py-20 flex flex-col items-center text-center">

        <h1 className="text-4xl md:text-6xl font-extrabold text-blue-900 tracking-tight leading-tight max-w-3xl">
          Secure Your Money <br />
          <span className="text-indigo-600">Control Your Future</span>
        </h1>

        <p className="mt-5 text-blue-800/90 max-w-xl text-base md:text-lg leading-relaxed">
          VaultX helps you manage, track, and transfer your money with speed, security, and complete control.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">

          <Link to="/signin">
            <button className="px-8 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-sky-500 to-indigo-600 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
              Get Started →
            </button>
          </Link>

          <Link to="/signup">
            <button className="px-8 py-3 rounded-xl font-semibold border border-blue-300/50 bg-white/50 backdrop-blur-md hover:bg-white/70 transition-all duration-300">
              Create Account
            </button>
          </Link>

        </div>
      </div>

      {/* Features */}
      <div className="px-6 md:px-12 pb-20 grid md:grid-cols-3 gap-6">

        {[
          { title: "Instant Transfers", desc: "Send money instantly without delays or friction." },
          { title: "Real-Time Tracking", desc: "Monitor your balance and activity live anytime." },
          { title: "Secure Banking", desc: "Advanced protection keeps your data and money safe." }
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/50 backdrop-blur-lg border border-white/40 rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >

            <div className="text-3xl mb-3">💎</div>

            <h3 className="text-lg font-semibold text-blue-900">
              {item.title}
            </h3>

            <p className="text-sm text-blue-800/80 mt-2 leading-relaxed">
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

export default NotLogin