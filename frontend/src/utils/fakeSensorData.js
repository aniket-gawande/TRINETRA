export function generateSensorData() {
  return {
    aqi: Math.floor(Math.random() * 200),
    temperature: (25 + Math.random() * 10).toFixed(1),
    humidity: Math.floor(40 + Math.random() * 30),
    waterLevel: Math.floor(Math.random() * 30),
    fire: Math.random() > 0.85,
    timestamp: new Date().toLocaleTimeString(),
  };
}
