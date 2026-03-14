"use client";

import { useState, useRef } from "react";
import { WAYPOINTS } from "../config";

const pickupZones = WAYPOINTS.filter((w) => w.type === "pickup");
const dropoffZones = WAYPOINTS.filter((w) => w.type === "dropoff");

export default function RequestModal({ isOpen, onClose, onSubmit }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [pickupId, setPickupId] = useState(pickupZones[0]?.id || "");
  const [dropoffId, setDropoffId] = useState(dropoffZones[0]?.id || "");
  const [code, setCode] = useState("");
  const nameRef = useRef(null);

  if (!isOpen) return null;

  function generateCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let c = "";
    for (let i = 0; i < 6; i++) c += chars[Math.floor(Math.random() * chars.length)];
    return c;
  }

  function handleConfirm() {
    const newCode = generateCode();
    setCode(newCode);
    const pickup = WAYPOINTS.find((w) => w.id === pickupId);
    const dropoff = WAYPOINTS.find((w) => w.id === dropoffId);
    onSubmit({
      name: name.trim(),
      pickupId,
      pickupName: pickup.name,
      pickupLatLng: pickup.latlng,
      dropoffId,
      dropoffName: dropoff.name,
      dropoffLatLng: dropoff.latlng,
      code: newCode,
    });
    setStep(5);
  }

  function handleDone() {
    setStep(1);
    setName("");
    setPickupId(pickupZones[0]?.id || "");
    setDropoffId(dropoffZones[0]?.id || "");
    setCode("");
    onClose();
  }

  function handleClose() {
    setStep(1);
    setName("");
    setCode("");
    onClose();
  }

  function nextStep(n) {
    if (n === 2 && !name.trim()) {
      nameRef.current?.classList.add("animate-shake");
      setTimeout(() => nameRef.current?.classList.remove("animate-shake"), 400);
      return;
    }
    setStep(n);
  }

  const pickupName = WAYPOINTS.find((w) => w.id === pickupId)?.name;
  const dropoffName = WAYPOINTS.find((w) => w.id === dropoffId)?.name;

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-[fadeIn_0.3s_ease]"
    >
      <div className="bg-[var(--bg-secondary)] border border-white/[0.08] rounded-2xl p-10 pt-10 w-[420px] max-w-[92vw] relative animate-[slideUp_0.35s_cubic-bezier(.4,0,.2,1)]">
        <button
          onClick={handleClose}
          className="absolute top-4 right-5 text-slate-500 hover:text-white text-2xl bg-transparent border-none cursor-pointer"
        >
          &times;
        </button>
        <h3 className="text-xl font-bold mb-7">Request a Pickup</h3>

        {/* Step 1: Name */}
        {step === 1 && (
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Your Name</label>
            <input
              ref={nameRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white focus:border-cyan-400 focus:outline-none transition"
              placeholder="e.g. Alex Johnson"
              autoFocus
            />
            <button onClick={() => nextStep(2)} className="w-full mt-4 px-5 py-3 text-sm font-semibold rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 text-[#0b0f1a] hover:-translate-y-0.5 transition-all">
              Next →
            </button>
          </div>
        )}

        {/* Step 2: Pickup */}
        {step === 2 && (
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Pickup Zone</label>
            <select
              value={pickupId}
              onChange={(e) => setPickupId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white focus:border-cyan-400 focus:outline-none appearance-none cursor-pointer"
            >
              {pickupZones.map((z) => (
                <option key={z.id} value={z.id} className="bg-[var(--bg-secondary)] text-white">{z.name}</option>
              ))}
            </select>
            <button onClick={() => nextStep(3)} className="w-full mt-4 px-5 py-3 text-sm font-semibold rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 text-[#0b0f1a] hover:-translate-y-0.5 transition-all">
              Next →
            </button>
            <button onClick={() => setStep(1)} className="w-full mt-2 px-5 py-2.5 text-sm text-slate-400 hover:text-white transition bg-transparent border-none cursor-pointer">
              ← Back
            </button>
          </div>
        )}

        {/* Step 3: Drop-off */}
        {step === 3 && (
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Drop-off Zone</label>
            <select
              value={dropoffId}
              onChange={(e) => setDropoffId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white focus:border-cyan-400 focus:outline-none appearance-none cursor-pointer"
            >
              {dropoffZones.map((z) => (
                <option key={z.id} value={z.id} className="bg-[var(--bg-secondary)] text-white">{z.name}</option>
              ))}
            </select>
            <button onClick={() => setStep(4)} className="w-full mt-4 px-5 py-3 text-sm font-semibold rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 text-[#0b0f1a] hover:-translate-y-0.5 transition-all">
              Next →
            </button>
            <button onClick={() => setStep(2)} className="w-full mt-2 px-5 py-2.5 text-sm text-slate-400 hover:text-white transition bg-transparent border-none cursor-pointer">
              ← Back
            </button>
          </div>
        )}

        {/* Step 4: Confirm */}
        {step === 4 && (
          <div>
            <div className="bg-black/20 rounded-xl p-5 mb-3">
              <ConfirmRow label="Name" value={name.trim()} />
              <ConfirmRow label="Pickup" value={pickupName} />
              <ConfirmRow label="Drop-off" value={dropoffName} last />
            </div>
            <button onClick={handleConfirm} className="w-full mt-2 px-5 py-3 text-sm font-semibold rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 text-[#0b0f1a] hover:-translate-y-0.5 transition-all">
              Confirm & Get Code
            </button>
            <button onClick={() => setStep(3)} className="w-full mt-2 px-5 py-2.5 text-sm text-slate-400 hover:text-white transition bg-transparent border-none cursor-pointer">
              ← Back
            </button>
          </div>
        )}

        {/* Step 5: Code reveal */}
        {step === 5 && (
          <div className="text-center">
            <p className="text-slate-400 mb-4">Your secure pickup code is:</p>
            <div className="inline-block text-4xl font-extrabold tracking-[0.25em] text-cyan-400 bg-cyan-400/[0.08] px-8 py-4 rounded-xl border-2 border-cyan-400 font-mono animate-pop-in">
              {code}
            </div>
            <p className="text-xs text-slate-500 mt-4">Share this code with no one else — you&apos;ll need it when the robot arrives.</p>
            <button onClick={handleDone} className="w-full mt-6 px-5 py-3 text-sm font-semibold rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 text-[#0b0f1a] hover:-translate-y-0.5 transition-all">
              Done
            </button>
          </div>
        )}

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-6">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              className={`w-2 h-2 rounded-full transition-all ${
                n <= step ? "bg-cyan-400 scale-125" : "bg-white/[0.08]"
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px) scale(.97); } to { transform: translateY(0) scale(1); } }
      `}</style>
    </div>
  );
}

function ConfirmRow({ label, value, last }) {
  return (
    <div className={`flex justify-between py-2 ${last ? "" : "border-b border-white/[0.08]"}`}>
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
