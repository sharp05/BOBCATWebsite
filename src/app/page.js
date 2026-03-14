"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Header from "./components/Header";
import Hero from "./components/Hero";
import DeliveryQueue from "./components/DeliveryQueue";
import RequestModal from "./components/RequestModal";
import { ROBOT_ROUTE, MOVE_INTERVAL_MS, SPEED_KMH } from "./config";

// Dynamic import for CampusMap to avoid SSR issues with Leaflet
const CampusMap = dynamic(() => import("./components/CampusMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] bg-[var(--bg-secondary)] flex items-center justify-center">
      <p className="text-slate-500">Loading map…</p>
    </div>
  ),
});

export default function Home() {
  const [robotIdx, setRobotIdx] = useState(0);
  const [deliveries, setDeliveries] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [completedToday, setCompletedToday] = useState(0);
  const [nextQueueNum, setNextQueueNum] = useState(1);

  // Robot simulation — advance position every interval
  useEffect(() => {
    const interval = setInterval(() => {
      setRobotIdx((prev) => (prev + 1) % ROBOT_ROUTE.length);
    }, MOVE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  // Auto-advance delivery statuses based on robot position
  useEffect(() => {
    setDeliveries((prev) => {
      let changed = false;
      const updated = prev.map((d) => {
        if (d.status === "pending" && !prev.some((x) => x.status === "transit")) {
          changed = true;
          return { ...d, status: "transit" };
        }
        if (d.status === "transit") {
          const dist = haversineKm(
            ROBOT_ROUTE[robotIdx][0], ROBOT_ROUTE[robotIdx][1],
            d.dropoffLatLng[0], d.dropoffLatLng[1]
          );
          if (dist < 0.03) {
            changed = true;
            setCompletedToday((c) => c + 1);
            return { ...d, status: "delivered" };
          }
        }
        return d;
      });
      return changed ? updated : prev;
    });
  }, [robotIdx]);

  // Compute stats
  const activeCount = deliveries.filter((d) => d.status !== "delivered").length;
  const activeDelivery = deliveries.find((d) => d.status === "transit");

  let etaText = "No deliveries";
  let robotStatus = "Idle";

  if (activeDelivery) {
    const dist = haversineKm(
      ROBOT_ROUTE[robotIdx][0], ROBOT_ROUTE[robotIdx][1],
      activeDelivery.dropoffLatLng[0], activeDelivery.dropoffLatLng[1]
    );
    const mins = Math.max(1, Math.round(dist / (SPEED_KMH / 60)));
    etaText = `~${mins} min`;
    robotStatus = "In Transit";
  } else if (deliveries.some((d) => d.status === "pending")) {
    etaText = "Queued";
    robotStatus = "Pending Pickup";
  }

  const nextEtaDisplay =
    activeDelivery
      ? etaText
      : deliveries.some((d) => d.status === "pending")
      ? "Soon"
      : "--";

  function handleSubmit(data) {
    const newDelivery = {
      id: "del-" + Date.now(),
      queueNum: nextQueueNum,
      name: data.name,
      pickupName: data.pickupName,
      dropoffName: data.dropoffName,
      pickupLatLng: data.pickupLatLng,
      dropoffLatLng: data.dropoffLatLng,
      code: data.code,
      status: "pending",
    };
    setDeliveries((prev) => [...prev, newDelivery]);
    setNextQueueNum((n) => n + 1);
  }

  return (
    <>
      <Header onRequestPickup={() => setModalOpen(true)} />
      <main>
        <Hero
          activeCount={activeCount}
          completedCount={completedToday}
          nextEta={nextEtaDisplay}
          onRequestPickup={() => setModalOpen(true)}
        />
        <CampusMap
          robotPosition={ROBOT_ROUTE[robotIdx]}
          etaText={etaText}
          robotStatus={robotStatus}
        />
        <DeliveryQueue
          deliveries={deliveries}
          onRequestPickup={() => setModalOpen(true)}
        />
      </main>
      <footer className="text-center py-10 border-t border-white/[0.08] text-slate-500 text-sm">
        © 2026 CampusBot Delivery · UC Merced · Built for the future of autonomous delivery.
      </footer>
      <RequestModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
