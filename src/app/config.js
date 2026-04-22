// UC Merced campus center and real waypoints based on campus map
export const CAMPUS_CENTER = [37.3660, -120.4235];
export const MAP_ZOOM = 16;

export const WAYPOINTS = [
  // ─── Pickup Zones (campus/academic buildings) ───
  { id: "p1", name: "Kolligian Library",                type: "pickup",  latlng: [37.36589, -120.42460] },
  { id: "p2", name: "Student Activities & Rec Center",  type: "pickup",  latlng: [37.36504, -120.42611] },
  { id: "p3", name: "Yablokoff-Wallace Dining Center",  type: "pickup",  latlng: [37.36420, -120.42705] },
  { id: "p4", name: "Science & Engineering (S&E)",      type: "pickup",  latlng: [37.36601, -120.42195] },
  { id: "p5", name: "Classroom & Office Building 2",    type: "pickup",  latlng: [37.36699, -120.42420] },
  { id: "p6", name: "GRAN (Granite Pass)",              type: "pickup",  latlng: [37.36292, -120.42581] },

  // ─── Drop-off Zones (housing & hubs) ───
  { id: "d1", name: "Sierra Terraces Housing",          type: "dropoff", latlng: [37.36529, -120.42737] },
  { id: "d2", name: "Valley Terraces Housing",          type: "dropoff", latlng: [37.36374, -120.42794] },
  { id: "d4", name: "Glacier Point Housing",            type: "dropoff", latlng: [37.36338, -120.42486] },
  { id: "d5", name: "The Summits Housing",              type: "dropoff", latlng: [37.36371, -120.42988] },
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
];

export const SPEED_KMH = 6;
export const MOVE_INTERVAL_MS = 2500;
