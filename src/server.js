// server.js
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { connect, getDataFromSocket, getCurrentRainStatus } from "./utils/rains.js";
import "./controllers/rainController.js";
import "./controllers/userController.js";
import { DATABASE_PASSWORD, DATABASE_STRING, PORT } from "../config.js";

const DB = DATABASE_STRING.replace("<PASSWORD>", DATABASE_PASSWORD);

mongoose.connect(DB, {}).then(con => {
  console.log('DB connection successful!');
}).catch(err => {
  console.log(err);
});

const port = PORT || 3000;
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('New client connected');

  // Enviar datos de lluvia actuales al cliente que se acaba de conectar
  const currentRainData = getCurrentRainStatus();
  if (currentRainData) {
    console.log("Sending current rain data to new client:", currentRainData);
    socket.emit('rainData', currentRainData);
  }

  // Configurar el listener para nuevos datos de lluvia
  getDataFromSocket((data) => {
    console.log("Emitting new rain data to all clients:", data);
    io.emit('rainData', data);
  });

  socket.on('requestCurrentData', () => {
    const currentData = getCurrentRainStatus();
    console.log("Client requested current data, sending:", currentData);
    socket.emit('currentData', currentData);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

connect();

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});