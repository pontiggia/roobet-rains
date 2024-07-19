// src/utils/rains.js
import WebSocket from "ws";

const url = "wss://api.roobet.com/socket.io/?EIO=3&transport=websocket";

let dataCallback = null;

export const connect = () => {
  const ws = new WebSocket(url, {
    headers: {
      Origin: "https://roobet.com",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    },
  });

  ws.on("open", () => {
    console.log("Connected to the server.");
  });
  ``
  ws.on("message", (data) => {
    const message = data.toString();
    processMessage(message);
  });

  ws.on("close", () => {
    console.log("Disconnected from the server. Attempting to reconnect...");
    setTimeout(connect, 1000);
  });

  ws.on("error", (err) => {
    console.error("WebSocket error:", err);
  });
};

export const getDataFromSocket = (callback) => {
  dataCallback = callback;
};

function processMessage(data) {
  try {
    const jsonData = extractJson(data);
    if (jsonData) {
      const parsedData = JSON.parse(jsonData);
      const eventType = parsedData[0];
      const eventData = parsedData[1];
      if (eventType === 'new_bet') {
        console.log('New bet:', eventData);
        if (dataCallback) {
          dataCallback(eventData);
        }
      }
    }
  } catch (error) {
    console.error('Error parsing or handling message or just opened');
  }
}

function extractJson(data) {
  const startIndex = data.indexOf('[');
  return startIndex > -1 ? data.substring(startIndex) : null;
}