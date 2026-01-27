import { useState } from "react";
import { api } from "../services/api";
import "./CSVImport.css";

export default function CSVImport({ onImportSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMessage("");
      setError("");
    }
  };

  const parseCSV = (text) => {
    const lines = text.trim().split("\n");
    if (lines.length < 2) throw new Error("CSV file is empty");

    // Parse headers
    const headers = lines[0].split("\t"); // Assuming tab-separated based on provided data
    
    // If not tab-separated, try comma
    let separator = "\t";
    if (headers.length === 1) {
      separator = ",";
    }

    const data = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(separator);
      if (values.length !== headers.length) continue;

      const row = {};
      headers.forEach((header, idx) => {
        const normalizedHeader = header.trim();
        row[normalizedHeader] = values[idx].trim();
      });
      data.push(row);
    }

    return data;
  };

  const handleImport = async () => {
    if (!file) {
      setError("Please select a CSV file");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const text = await file.text();
      const csvData = parseCSV(text);

      console.log(`📊 Parsed ${csvData.length} rows from CSV`);
      setMessage(`📊 Parsed ${csvData.length} rows. Uploading...`);

      // Upload to backend
      const response = await api.post("/sensors/import-csv", {
        data: csvData
      });

      console.log("✅ Import response:", response.data);
      setMessage(`✅ Successfully imported ${response.data.imported} records!`);
      setProgress(100);

      // Reset form
      setFile(null);
      document.querySelector('input[type="file"]').value = "";

      // Callback to refresh dashboard
      if (onImportSuccess) {
        setTimeout(onImportSuccess, 1500);
      }
    } catch (err) {
      console.error("❌ Import failed:", err);
      setError(`❌ Import failed: ${err.message}`);
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="csv-import-container">
      <div className="csv-card">
        <h3>📋 Import Sensor Data from CSV</h3>
        
        <div className="import-section">
          <label className="file-label">
            <input
              type="file"
              accept=".csv,.tsv,.txt"
              onChange={handleFileChange}
              disabled={loading}
            />
            <span className="file-button">
              {file ? `✅ ${file.name}` : "📁 Choose CSV File"}
            </span>
          </label>

          <button
            onClick={handleImport}
            disabled={!file || loading}
            className="btn-import"
          >
            {loading ? "⏳ Importing..." : "🚀 Import Data"}
          </button>
        </div>

        {progress > 0 && (
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        )}

        {message && (
          <div className="message success">
            {message}
          </div>
        )}

        {error && (
          <div className="message error">
            {error}
          </div>
        )}

        <div className="csv-info">
          <h4>📝 CSV Format Expected:</h4>
          <p>Your CSV should have these columns:</p>
          <ul>
            <li><strong>Date & Time</strong> - Timestamp (e.g., "9/25/2025 23:29:01")</li>
            <li><strong>Temp (°C)</strong> - Temperature in Celsius</li>
            <li><strong>Pressure (hPa)</strong> - Atmospheric pressure</li>
            <li><strong>Altitude (m)</strong> - Altitude in meters</li>
            <li><strong>GasRaw</strong> - Raw gas sensor reading</li>
            <li><strong>SoilRaw</strong> - Raw soil sensor reading</li>
            <li><strong>WaterRaw</strong> - Raw water sensor reading</li>
            <li><strong>Lat</strong> - Latitude (optional)</li>
            <li><strong>Lng</strong> - Longitude (optional)</li>
            <li><strong>Sats</strong> - Satellite count (optional)</li>
            <li><strong>PM1</strong> - PM1.0 particulates</li>
            <li><strong>PM 2.5</strong> - PM2.5 particulates (AQI)</li>
            <li><strong>PM10</strong> - PM10 particulates</li>
          </ul>

          <h4>💡 Tips:</h4>
          <ul>
            <li>Use tab-separated or comma-separated values</li>
            <li>Include header row with column names</li>
            <li>Use "NA" for missing values</li>
            <li>Use "-1" for invalid sensor readings (they'll be ignored)</li>
            <li>Date format: "M/D/YYYY HH:MM:SS"</li>
          </ul>

          <h4>🔗 Sample Data:</h4>
          <pre>
{`Date & Time	Temp (°C)	Pressure (hPa)	Altitude (m)	GasRaw	SoilRaw	WaterRaw	Lat	Lng	Sats	PM1	PM 2.5	PM10
9/25/2025 23:29:01	27.21	942.58	605.71	1023	3918	213	NA	NA	0	4	14	18
9/25/2025 23:29:07	27.34	942.64	605.24	1036	3893	207	NA	NA	0	4	14	18`}
          </pre>
        </div>
      </div>
    </div>
  );
}
