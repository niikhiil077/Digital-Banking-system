import React from 'react'

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-200 to-indigo-200 relative overflow-hidden flex items-center justify-center">

      {/* Background Glow */}
      <div className="absolute top-[-120px] left-[-120px] w-[28rem] h-[28rem] bg-sky-400/40 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[28rem] h-[28rem] bg-indigo-500/40 blur-[120px] rounded-full animate-pulse"></div>

      {/* Glass Card */}
      <div className="relative bg-white/40 backdrop-blur-2xl border border-white/30 rounded-[2rem] px-12 py-14 shadow-2xl flex flex-col items-center gap-6">

        {/* Logo + Pulse */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-20 h-20 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full blur-2xl opacity-50 animate-ping"></div>
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-xl">
            V
          </div>
        </div>

        {/* Text */}
        <h2 className="text-xl font-semibold text-blue-900 tracking-wide">
          Loading your vault...
        </h2>

        {/* Animated Bars */}
        <div className="flex gap-2 mt-2">
          <div className="w-2 h-6 bg-blue-500 rounded animate-bounce"></div>
          <div className="w-2 h-6 bg-indigo-500 rounded animate-bounce [animation-delay:0.2s]"></div>
          <div className="w-2 h-6 bg-blue-400 rounded animate-bounce [animation-delay:0.4s]"></div>
        </div>

        {/* Skeleton Lines */}
        <div className="mt-6 w-56 space-y-3">
          <div className="h-3 bg-white/60 rounded animate-pulse"></div>
          <div className="h-3 bg-white/60 rounded w-4/5 animate-pulse"></div>
          <div className="h-3 bg-white/60 rounded w-3/5 animate-pulse"></div>
        </div>

      </div>

    </div>
  )
}

export default Loading
