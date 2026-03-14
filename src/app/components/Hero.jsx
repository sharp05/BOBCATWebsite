"use client";

export default function Hero({ activeCount, completedCount, nextEta, onRequestPickup }) {
  return (
    <section className="min-h-screen flex items-center justify-center text-center px-6 pt-28 pb-20 bg-[radial-gradient(ellipse_at_30%_20%,rgba(34,211,238,0.08)_0%,transparent_50%),radial-gradient(ellipse_at_70%_80%,rgba(251,191,36,0.06)_0%,transparent_50%)] bg-[var(--bg-primary)]">
      <div className="max-w-2xl animate-[fadeUp_0.8s_cubic-bezier(.4,0,.2,1)_both]">
        <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-extrabold leading-tight mb-5">
          Autonomous Deliveries,<br />
          <span className="text-cyan-400">Secured by You.</span>
        </h2>
        <p className="text-lg text-slate-400 mb-9 max-w-xl mx-auto">
          Track the UC Merced delivery robot in real-time, request a pickup, and receive a secure code — so only you get your package.
        </p>
        <button
          onClick={onRequestPickup}
          className="px-10 py-4 text-base font-semibold rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 text-[#0b0f1a] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(34,211,238,0.3)] transition-all animate-[pulseGlow_2.5s_infinite]"
        >
          Request a Pickup
        </button>

        {/* Stats */}
        <div className="flex justify-center gap-5 mt-12 flex-wrap">
          <StatChip label="Active Deliveries" value={activeCount} />
          <StatChip label="Completed Today" value={completedCount} />
          <StatChip label="Next ETA" value={nextEta} />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

function StatChip({ label, value }) {
  return (
    <div className="bg-white/[0.04] border border-white/[0.08] backdrop-blur-md rounded-2xl px-6 py-4 min-w-[130px] flex flex-col items-center gap-1">
      <span className="text-2xl font-bold text-cyan-400">{value}</span>
      <span className="text-[0.7rem] text-slate-500 uppercase tracking-wider">{label}</span>
    </div>
  );
}
