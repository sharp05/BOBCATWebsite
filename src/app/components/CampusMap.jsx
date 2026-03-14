"use client";

import { useEffect, useRef, useCallback } from "react";
import L from "leaflet";
import { CAMPUS_CENTER, MAP_ZOOM, WAYPOINTS } from "../config";

export default function CampusMap({ robotPosition, etaText, robotStatus }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const robotMarkerRef = useRef(null);

  const initMap = useCallback(() => {
    if (mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: CAMPUS_CENTER,
      zoom: MAP_ZOOM,
      zoomControl: true,
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
        maxZoom: 19,
      }
    ).addTo(map);

    // Waypoint markers
    WAYPOINTS.forEach((wp) => {
      const isPickup = wp.type === "pickup";
      const icon = L.divIcon({
        className: "custom-wp-icon",
        html: `<div style="
          width:14px;height:14px;border-radius:50%;
          background:${isPickup ? "#34d399" : "#60a5fa"};
          border:2px solid #fff;
          box-shadow:0 0 8px ${isPickup ? "rgba(52,211,153,.5)" : "rgba(96,165,250,.5)"};
        "></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });
      L.marker(wp.latlng, { icon })
        .bindTooltip(wp.name, {
          direction: "top",
          offset: [0, -10],
          className: "map-tooltip",
        })
        .addTo(map);
    });

    // Robot marker
    const robotIcon = L.divIcon({
      className: "",
      html: '<div class="robot-marker-pulse"></div>',
      iconSize: [22, 22],
      iconAnchor: [11, 11],
    });
    const robotMarker = L.marker(robotPosition || CAMPUS_CENTER, {
      icon: robotIcon,
      zIndexOffset: 1000,
    }).addTo(map);
    robotMarker.bindTooltip("🤖 CampusBot", {
      permanent: true,
      direction: "top",
      offset: [0, -14],
      className: "map-tooltip robot-tooltip",
    });

    robotMarkerRef.current = robotMarker;
    mapInstance.current = map;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    initMap();
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [initMap]);

  // Animate robot to new position
  useEffect(() => {
    if (!robotMarkerRef.current || !robotPosition) return;
    const marker = robotMarkerRef.current;
    const start = marker.getLatLng();
    const startTime = performance.now();
    const duration = 2000;

    function step(now) {
      const t = Math.min((now - startTime) / duration, 1);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const lat = start.lat + (robotPosition[0] - start.lat) * ease;
      const lng = start.lng + (robotPosition[1] - start.lng) * ease;
      marker.setLatLng([lat, lng]);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [robotPosition]);

  const statusColor =
    robotStatus === "In Transit"
      ? "text-amber-400"
      : robotStatus === "Delivered"
      ? "text-emerald-400"
      : "text-slate-500";

  return (
    <section id="map-section" className="px-6 py-20">
      <div className="text-center max-w-xl mx-auto mb-10">
        <h2 className="text-3xl font-bold mb-2">Live Robot Tracker</h2>
        <p className="text-slate-400 text-sm">
          Watch the robot navigate UC Merced in real-time.{" "}
          <span className="text-emerald-400">Green</span> = pickup zones,{" "}
          <span className="text-blue-400">Blue</span> = drop-off zones.
        </p>
      </div>
      <div className="relative max-w-6xl mx-auto rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_0_60px_rgba(34,211,238,0.06)]">
        <div ref={mapRef} className="h-[500px] w-full bg-[var(--bg-secondary)]" />

        {/* ETA Overlay */}
        <div className="absolute top-4 right-4 z-[500] flex flex-col gap-2">
          <div className="bg-[rgba(11,15,26,0.85)] backdrop-blur-xl border border-white/[0.08] rounded-xl px-5 py-2.5 flex flex-col">
            <span className="text-[0.65rem] uppercase tracking-wider text-slate-500">Current ETA</span>
            <span className="text-base font-bold text-cyan-400">{etaText}</span>
          </div>
          <div className="bg-[rgba(11,15,26,0.85)] backdrop-blur-xl border border-white/[0.08] rounded-xl px-5 py-2.5 flex flex-col">
            <span className="text-[0.65rem] uppercase tracking-wider text-slate-500">Robot Status</span>
            <span className={`text-base font-bold ${statusColor}`}>{robotStatus}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
