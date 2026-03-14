"use client";

import { ChevronDown } from "lucide-react";

export default function Header({ onRequestPickup }) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[rgba(11,15,26,0.85)] backdrop-blur-xl border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 text-cyan-400">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="10" width="32" height="22" rx="6" stroke="currentColor" strokeWidth="2.5"/>
              <circle cx="14" cy="21" r="3" fill="currentColor"/>
              <circle cx="26" cy="21" r="3" fill="currentColor"/>
              <path d="M13 7 L20 2 L27 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="10" y="32" width="6" height="4" rx="2" fill="currentColor"/>
              <rect x="24" y="32" width="6" height="4" rx="2" fill="currentColor"/>
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-extrabold leading-tight tracking-tight">CampusBot</h1>
            <span className="text-[0.65rem] text-slate-500 uppercase tracking-widest">UC Merced Delivery</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-7">
          <a href="#map-section" className="text-sm text-slate-400 hover:text-white transition-colors">Live Map</a>
          <a href="#queue-section" className="text-sm text-slate-400 hover:text-white transition-colors">Queue</a>
          <button
            onClick={onRequestPickup}
            className="px-5 py-2 text-sm font-semibold rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 text-[#0b0f1a] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(34,211,238,0.3)] transition-all"
          >
            Request Pickup
          </button>
        </nav>
      </div>
    </header>
  );
}
