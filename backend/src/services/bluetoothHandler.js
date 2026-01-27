import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

/**
 * Bluetooth Handler for TRINETRA Rover
 * Manages serial communication with the Bluetooth module connected to the rover
 */

let port = null;
let isConnected = false;
let parser = null;

const bluetoothHandler = {
  /**
   * Initialize Bluetooth connection to rover
   * @param {string} portName - Serial port name (e.g., 'COM5', '/dev/ttyUSB0')
   * @param {number} baudRate - Baud rate (default 115200)
   */
  initialize: async (portName, baudRate = 115200) => {
    try {
      // Check if port is already open
      if (port && isConnected) {
        console.log("ℹ️  Bluetooth already connected");
        return true;
      }

      // Initialize SerialPort (v10+ syntax)
      port = new SerialPort({
        path: portName,
        baudRate: baudRate,
        autoOpen: true,
      });

      // Pipe data through a delimiter parser for cleaner reading
      parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

      // Handle connection opened
      port.on("open", () => {
        isConnected = true;
        console.log(`✅ Bluetooth connected on ${portName}`);
      });

      // Handle incoming data from rover (via parser)
      parser.on("data", (data) => {
        const message = data.toString().trim();
        console.log(`📡 Rover Message: ${message}`);
        
        // Parse and handle rover sensor data, GPS, etc.
        bluetoothHandler.parseRoverData(message);
      });

      // Handle errors
      port.on("error", (err) => {
        console.error(`❌ Bluetooth Error: ${err.message}`);
        isConnected = false;
      });

      // Handle port closed
      port.on("close", () => {
        isConnected = false;
        console.log("⚠️  Bluetooth connection closed");
      });

      return true;
    } catch (error) {
      console.error(`❌ Bluetooth initialization failed: ${error.message}`);
      isConnected = false;
      throw error;
    }
  },

  /**
   * Parse incoming rover data
   * Expected format: TYPE:VALUE,VALUE2,VALUE3
   */
  parseRoverData: (message) => {
    if (!message) return;

    const parts = message.split(":");
    if (parts.length < 2) return;

    const type = parts[0];
    const data = parts[1].split(",");

    switch (type) {
      case "GPS":
        bluetoothHandler.handleGPS(data);
        break;
      case "SENSOR":
        bluetoothHandler.handleSensorData(data);
        break;
      case "STATUS":
        bluetoothHandler.handleStatus(data);
        break;
      case "ALERT":
        bluetoothHandler.handleAlert(data);
        break;
      default:
        console.log(`ℹ️  Unknown message type: ${type}`);
    }
  },

  handleGPS: (data) => {
    if (data.length >= 2) {
      const [latitude, longitude, altitude] = data;
      console.log(`📍 GPS Update: Lat ${latitude}, Lng ${longitude}, Alt ${altitude}m`);
    }
  },

  handleSensorData: (data) => {
    if (data.length >= 3) {
      const [temperature, humidity, pressure] = data;
      console.log(`🌡️  Sensor Data: Temp ${temperature}°C, Humidity ${humidity}%, Pressure ${pressure}hPa`);
    }
  },

  handleStatus: (data) => {
    if (data.length >= 3) {
      const [battery, signal, mode] = data;
      console.log(`⚡ Rover Status: Battery ${battery}%, Signal ${signal}%, Mode ${mode}`);
    }
  },

  handleAlert: (data) => {
    const alertType = data[0];
    const alertMsg = data.slice(1).join(",");
    console.log(`🚨 Rover Alert [${alertType}]: ${alertMsg}`);
  },

  /**
   * Send command to rover
   * Handles optional object payloads by formatting them if necessary
   */
  sendCommand: (command, payload = null) => {
    if (!port || !isConnected) {
      console.error("❌ Bluetooth not connected");
      return false;
    }

    let message = command;

    // Handle payload serialization if needed
    if (payload) {
      if (command === "CONFIG") {
        // Example: CONFIG:1000,500,2000
        message = `CONFIG:${payload.gpsInterval},${payload.sensorInterval},${payload.cameraInterval}`;
      } else if (typeof payload === 'object') {
        // Fallback for other objects, append as JSON or ignore if not supported by firmware
        // For simple commands like START_RECORDING, the command string is sufficient
      }
    }

    try {
      port.write(message + "\n", (err) => {
        if (err) {
          console.error(`❌ Failed to send command: ${err.message}`);
          return false;
        }
        console.log(`📤 Command sent: ${message}`);
        return true;
      });
    } catch (error) {
      console.error(`❌ Error sending command: ${error.message}`);
      return false;
    }
  },

  // --- Missing Methods Implementation ---

  getStatus: () => {
    return {
      connected: isConnected,
      port: port ? port.path : null,
      baudRate: port ? port.baudRate : null
    };
  },

  startTrip: (tripId) => {
    bluetoothHandler.sendCommand(`TRIP:START,${tripId}`);
  },

  stopTrip: () => {
    bluetoothHandler.sendCommand("TRIP:STOP");
  },

  requestDataSync: () => {
    bluetoothHandler.sendCommand("SYNC:REQUEST");
  },

  // --- Movement Methods ---

  moveForward: (speed = 50) => {
    bluetoothHandler.sendCommand(`MOVE:forward,${speed}`);
  },

  moveBackward: (speed = 50) => {
    bluetoothHandler.sendCommand(`MOVE:backward,${speed}`);
  },

  turnLeft: (angle = 45) => {
    bluetoothHandler.sendCommand(`MOVE:left,${angle}`);
  },

  turnRight: (angle = 45) => {
    bluetoothHandler.sendCommand(`MOVE:right,${angle}`);
  },

  stop: () => {
    bluetoothHandler.sendCommand("MOVE:stop");
  },

  setAutonomousMode: (waypoints) => {
    const waypointStr = waypoints
      .map((w) => `${w.lat},${w.lng}`)
      .join(";");
    bluetoothHandler.sendCommand(`MODE:autonomous,${waypointStr}`);
  },

  setManualMode: () => {
    bluetoothHandler.sendCommand("MODE:manual");
  },

  close: () => {
    if (port && isConnected) {
      port.close((err) => {
        if (err) {
          console.error(`❌ Error closing port: ${err.message}`);
        } else {
          console.log("✅ Bluetooth port closed");
        }
      });
      isConnected = false;
    }
  },

  listPorts: async () => {
    try {
      const ports = await SerialPort.list();
      console.log("📋 Available Serial Ports:");
      ports.forEach((port) => {
        console.log(`  - ${port.path} (${port.manufacturer})`);
      });
      return ports;
    } catch (error) {
      console.error(`❌ Error listing ports: ${error.message}`);
      return [];
    }
  },
};

export default bluetoothHandler;