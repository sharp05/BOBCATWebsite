// UC Merced campus center and real waypoints based on campus map
export const CAMPUS_CENTER = [37.3660, -120.4235];
export const MAP_ZOOM = 16;

export const WAYPOINTS = [
  // ─── Pickup Zones (campus/academic buildings) ───
  { id: "p1", name: "Kolligian Library",                type: "pickup",  latlng: [37.3653, -120.4270] },
  { id: "p2", name: "Student Activities & Rec Center",  type: "pickup",  latlng: [37.3648, -120.4260] },
  { id: "p3", name: "Yablokoff-Wallace Dining Center",  type: "pickup",  latlng: [37.3658, -120.4250] },
  { id: "p4", name: "Science & Engineering (S&E)",      type: "pickup",  latlng: [37.3670, -120.4245] },
  { id: "p5", name: "Classroom & Office Building 2",    type: "pickup",  latlng: [37.3668, -120.4275] },
  { id: "p6", name: "(GRAN) Granite Pass",              type: "pickup",  latlng: [37.3672, -120.4240],
 
  // ─── Drop-off Zones (housing & hubs) ───
  { id: "d1", name: "(GRAN) Granite Pass",              type: "pickup",  latlng: [37.3672, -120.4240] },
  { id: "d2", name: "Sierra Terraces Housing",          type: "dropoff", latlng: [37.3643, -120.4262] },
  { id: "d3", name: "Valley Terraces Housing",          type: "dropoff", latlng: [37.3635, -120.4250] },
  { id: "d4", name: "Half Dome Housing",                type: "dropoff", latlng: [37.3625, -120.4245] },
  { id: "d5", name: "Glacier Point Housing",            type: "dropoff", latlng: [37.3680, -120.4220] },
  { id: "d6", name: "The Summits Housing",              type: "dropoff", latlng: [37.3615, -120.4235] },
  { id: "d7", name: "Tenaya Hall",                      type: "dropoff", latlng: [37.3621, -120.4228] },
  { id: "d8", name: "Cathedral Hall",                   type: "dropoff", latlng: [37.3610, -120.4225] },
  { id: "d9", name: "El Portal",                        type: "dropoff", latlng: [37.3271, -120.4738] },   
  { id: "d10", name: "Sentinel Rock",                   type: "dropoff", latlng: [37.3646, -120.4243] },
  { id: "d11", name: "Mariposa",                        type: "dropoff", latlng: [37.3660, -120.4248] },
];

// Robot patrol route (subset of waypoints forming a loop)
export const ROBOT_ROUTE = [
  [37.3653, -120.4270], // Library
  [37.3658, -120.4250], // Dining Center
  [37.3670, -120.4245], // S&E
  [37.3672, -120.4240], // GRAN
  [37.3680, -120.4220], // Glacier Point
  [37.3668, -120.4275], // COB2
  [37.3648, -120.4260], // Rec Center
  [37.3643, -120.4262], // Sierra Terraces
  [37.3635, -120.4250], // Valley Terraces
  [37.3625, -120.4245], // Half Dome
  [37.3621, -120.4228], // Tenaya
  [37.3610, -120.4225], // Cathedral
  [37.3615, -120.4235], // Summits
  [37.3660, -120.4248], // Mariposa
  [37.3646, -120.4243], // Sentinel Rock
  [37.3271, -120.4738], // El Portal
];

export const SPEED_KMH = 6;
export const MOVE_INTERVAL_MS = 2500;
