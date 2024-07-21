// server.js
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { connect, getDataFromSocket } from "./utils/rains.js";
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

  getDataFromSocket((data) => {
    socket.emit('rainData', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

connect();

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});