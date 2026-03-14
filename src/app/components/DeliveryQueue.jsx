"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function DeliveryQueue({ deliveries, onRequestPickup }) {
  return (
    <section id="queue-section" className="px-6 py-20 bg-[var(--bg-secondary)]">
      <div className="text-center max-w-xl mx-auto mb-10">
        <h2 className="text-3xl font-bold mb-2">Delivery Queue</h2>
        <p className="text-slate-400 text-sm">
          Current delivery orders — expand a card to see your secure pickup code.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {deliveries.length === 0 ? (
          <div className="text-center py-16 px-5 bg-white/[0.04] border border-dashed border-white/[0.08] rounded-2xl">
            <div className="text-5xl mb-3">📦</div>
            <p className="text-slate-500 mb-5">No deliveries in the queue yet.</p>
            <button
              onClick={onRequestPickup}
              className="px-5 py-2 text-sm font-semibold rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 text-[#0b0f1a] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(34,211,238,0.3)] transition-all"
            >
              Request the first one!
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {deliveries.map((d) => (
              <QueueCard key={d.id} delivery={d} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function QueueCard({ delivery }) {
  const [open, setOpen] = useState(false);
  const d = delivery;

  const statusClass =
    d.status === "pending"
      ? "bg-amber-400/15 text-amber-400"
      : d.status === "transit"
      ? "bg-blue-400/15 text-blue-400"
      : "bg-emerald-400/15 text-emerald-400";

  const statusLabel =
    d.status === "pending" ? "Pending" : d.status === "transit" ? "In Transit" : "Delivered";

  return (
    <div
      className={`bg-white/[0.04] border border-white/[0.08] rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-cyan-400/20 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]`}
    >
      {/* Header */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between px-6 py-4 cursor-pointer select-none"
      >
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 text-[#0b0f1a] font-extrabold text-base flex items-center justify-center shrink-0">
            #{d.queueNum}
          </div>
          <div>
            <h4 className="text-sm font-semibold">{d.name}</h4>
            <span className="text-xs text-slate-500">
              {d.pickupName} → {d.dropoffName}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-[0.7rem] font-semibold uppercase tracking-wide ${statusClass}`}>
            {statusLabel}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {/* Body */}
      <div
        className={`overflow-hidden transition-all duration-400 ${
          open ? "max-h-72 pb-6 px-6" : "max-h-0 px-6"
        }`}
      >
        <div className="grid grid-cols-2 gap-3 bg-black/20 rounded-xl p-4">
          <Detail label="Pickup" value={d.pickupName} />
          <Detail label="Drop-off" value={d.dropoffName} />
          <Detail label="Queue #" value={d.queueNum} />
          <Detail label="Status" value={statusLabel} />
          {/* Code */}
          <div className="col-span-2 text-center p-3 bg-cyan-400/[0.07] rounded-lg mt-1">
            <span className="block text-[0.68rem] uppercase tracking-wider text-cyan-400 mb-1">
              🔒 Secure Pickup Code
            </span>
            <span className="text-3xl font-extrabold tracking-[0.2em] text-cyan-400 font-mono">
              {d.code}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-[0.68rem] text-slate-500 uppercase tracking-wider">{label}</span>
      <span className="text-sm font-semibold mt-0.5">{value}</span>
    </div>
  );
}
