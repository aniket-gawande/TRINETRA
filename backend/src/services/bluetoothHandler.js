import SerialPort from "serialport";

/**
 * Bluetooth Handler for TRINETRA Rover
 * Manages serial communication with the Bluetooth module connected to the rover
 */

let port = null;
let isConnected = false;

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

      port = new SerialPort.SerialPort({
        path: portName,
        baudRate: baudRate,
        autoOpen: true,
      });

      // Handle connection opened
      port.on("open", () => {
        isConnected = true;
        console.log(`✅ Bluetooth connected on ${portName}`);
      });

      // Handle incoming data from rover
      port.on("data", (data) => {
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
   * Examples:
   * - GPS:40.7128,-74.0060,123.45
   * - SENSOR:temperature,humidity,pressure
   * - STATUS:battery,signal,mode
   * @param {string} message - Raw message from rover
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

  /**
   * Handle GPS data from rover
   * @param {array} data - [latitude, longitude, altitude]
   */
  handleGPS: (data) => {
    if (data.length >= 2) {
      const [latitude, longitude, altitude] = data;
      console.log(`📍 GPS Update: Lat ${latitude}, Lng ${longitude}, Alt ${altitude}m`);
      // TODO: Save to database, emit via WebSocket
    }
  },

  /**
   * Handle sensor data from rover
   * @param {array} data - Sensor values
   */
  handleSensorData: (data) => {
    if (data.length >= 3) {
      const [temperature, humidity, pressure] = data;
      console.log(
        `🌡️  Sensor Data: Temp ${temperature}°C, Humidity ${humidity}%, Pressure ${pressure}hPa`
      );
      // TODO: Save to database, emit via WebSocket
    }
  },

  /**
   * Handle rover status
   * @param {array} data - [battery_level, signal_strength, mode]
   */
  handleStatus: (data) => {
    if (data.length >= 3) {
      const [battery, signal, mode] = data;
      console.log(
        `⚡ Rover Status: Battery ${battery}%, Signal ${signal}%, Mode ${mode}`
      );
      // TODO: Save to database, emit via WebSocket
    }
  },

  /**
   * Handle alerts from rover
   * @param {array} data - [alert_type, alert_message]
   */
  handleAlert: (data) => {
    const alertType = data[0];
    const alertMsg = data.slice(1).join(",");
    console.log(`🚨 Rover Alert [${alertType}]: ${alertMsg}`);
    // TODO: Save to database, emit via WebSocket to notify users
  },

  /**
   * Send command to rover
   * Expected format: TYPE:VALUE,VALUE2,VALUE3
   * Examples:
   * - MOVE:forward,speed
   * - MOVE:left,angle
   * - MOVE:right,angle
   * - MOVE:stop
   * - MODE:autonomous,waypoints
   * - MODE:manual
   * @param {string} command - Command to send to rover
   */
  sendCommand: (command) => {
    if (!port || !isConnected) {
      console.error("❌ Bluetooth not connected");
      return false;
    }

    try {
      port.write(command + "\n", (err) => {
        if (err) {
          console.error(`❌ Failed to send command: ${err.message}`);
          return false;
        }
        console.log(`📤 Command sent: ${command}`);
        return true;
      });
    } catch (error) {
      console.error(`❌ Error sending command: ${error.message}`);
      return false;
    }
  },

  /**
   * Move rover forward
   * @param {number} speed - Speed (0-100)
   */
  moveForward: (speed = 50) => {
    bluetoothHandler.sendCommand(`MOVE:forward,${speed}`);
  },

  /**
   * Move rover backward
   * @param {number} speed - Speed (0-100)
   */
  moveBackward: (speed = 50) => {
    bluetoothHandler.sendCommand(`MOVE:backward,${speed}`);
  },

  /**
   * Turn rover left
   * @param {number} angle - Angle in degrees
   */
  turnLeft: (angle = 45) => {
    bluetoothHandler.sendCommand(`MOVE:left,${angle}`);
  },

  /**
   * Turn rover right
   * @param {number} angle - Angle in degrees
   */
  turnRight: (angle = 45) => {
    bluetoothHandler.sendCommand(`MOVE:right,${angle}`);
  },

  /**
   * Stop rover
   */
  stop: () => {
    bluetoothHandler.sendCommand("MOVE:stop");
  },

  /**
   * Enable autonomous mode with waypoints
   * @param {array} waypoints - Array of waypoint objects
   */
  setAutonomousMode: (waypoints) => {
    const waypointStr = waypoints
      .map((w) => `${w.lat},${w.lng}`)
      .join(";");
    bluetoothHandler.sendCommand(`MODE:autonomous,${waypointStr}`);
  },

  /**
   * Enable manual control mode
   */
  setManualMode: () => {
    bluetoothHandler.sendCommand("MODE:manual");
  },

  /**
   * Get connection status
   */
  isConnected: () => {
    return isConnected && port && port.isOpen;
  },

  /**
   * Close Bluetooth connection
   */
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

  /**
   * List available serial ports
   */
  listPorts: async () => {
    try {
      const ports = await SerialPort.SerialPort.list();
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
