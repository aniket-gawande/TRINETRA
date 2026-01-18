export const aqiHistory = Array.from({ length: 12 }, (_, i) => ({
  time: `${i + 1}h`,
  aqi: Math.floor(40 + Math.random() * 120),
}));

export const tempHumidity = Array.from({ length: 12 }, (_, i) => ({
  time: `${i + 1}h`,
  temperature: (25 + Math.random() * 8).toFixed(1),
  humidity: Math.floor(45 + Math.random() * 30),
}));

export const pollutionByArea = [
  { area: "Zone A", aqi: 120 },
  { area: "Zone B", aqi: 80 },
  { area: "Zone C", aqi: 60 },
  { area: "Zone D", aqi: 150 },
];
