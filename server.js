const mqtt = require("mqtt");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// MQTT broker configuration
const broker = "mqtt://broker.hivemq.com";

// Default data (including topic)
const defaultData = {
  name: "MEGATECH BMS 1",
  mac_address: "A4:C1:37:30:87:B9",
  topic: "bms-1", // Default topic
};
let currentData = { ...defaultData };

// Function to generate random data
const generateRandomData = () => ({
  ...currentData,
  soc: Math.floor(Math.random() * 101), // Random SOC percentage
  states: {
    charging: Math.random() < 0.5,
    balance: Math.random() < 0.5,
    dis_mos: Math.random() < 0.5,
    protection: Math.random() < 0.5,
  },
  svi: [
    {
      name: "Cell 1",
      value: parseFloat((Math.random() * (4.2 - 3.5) + 3.5).toFixed(3)),
    },
    {
      name: "Cell 2",
      value: parseFloat((Math.random() * (4.2 - 3.5) + 3.5).toFixed(3)),
    },
    {
      name: "Cell 3",
      value: parseFloat((Math.random() * (4.2 - 3.5) + 3.5).toFixed(3)),
    },
  ],
  temperature: [
    {
      mos: parseFloat((Math.random() * (80 - 20) + 20).toFixed(2)),
      1: parseFloat((Math.random() * (80 - 20) + 20).toFixed(2)),
      2: parseFloat((Math.random() * (80 - 20) + 20).toFixed(2)),
    },
    {
      mos: parseFloat((Math.random() * (90 - 70) + 70).toFixed(2)),
      1: parseFloat((Math.random() * (90 - 70) + 70).toFixed(2)),
      2: parseFloat((Math.random() * (90 - 70) + 70).toFixed(2)),
    },
  ],
  values: {
    total_volt: parseFloat((Math.random() * (60 - 48) + 48).toFixed(2)),
    current: parseFloat((Math.random() * 10).toFixed(2)),
    power: parseFloat((Math.random() * 100).toFixed(2)),
    vol_high: parseFloat((Math.random() * (4.2 - 3.8) + 3.8).toFixed(3)),
    vol_low: parseFloat((Math.random() * (3.8 - 3.2) + 3.2).toFixed(3)),
    vol_diff: parseFloat((Math.random() * (0.5 - 0.1) + 0.1).toFixed(3)),
    ave_vol: parseFloat((Math.random() * (4.2 - 3.5) + 3.5).toFixed(3)),
    cycle_index: Math.floor(Math.random() * 501),
  },
});

// MQTT client setup
const client = mqtt.connect(broker);

// MQTT connection
client.on("connect", () => {
  console.log("Connected to MQTT broker");
  setInterval(() => {
    const data = JSON.stringify(generateRandomData());
    client.publish(currentData.topic, data, (err) => {
      if (err) {
        console.error("Failed to publish:", err);
      } else {
        console.log(`Published to topic ${currentData.topic}: ${data}`);
      }
    });
  }, 1000); // Publish every 2 seconds
});

// Express server setup
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Endpoint to serve the webpage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Endpoint to get current data
app.get("/api/data", (req, res) => {
  res.json(currentData);
});

// Endpoint to update data temporarily (including topic)
app.post("/api/data", (req, res) => {
  currentData = { ...currentData, ...req.body };
  res.json({ message: "Data updated temporarily", currentData });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Reset data on restart
process.on("SIGINT", () => {
  console.log("Resetting data and shutting down...");
  currentData = { ...defaultData };
  process.exit();
});
