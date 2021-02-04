import express from 'express';
import { Server } from 'http';
import { resolve } from "path";

const app = express();
const server = new Server(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;

app.set("port", port);

app.get('/', (req, res) => {
  res.sendFile(resolve('./client/index.html'));
});

io.on("connection", function(socket: any) {
  console.log("a user connected");
  // whenever we receive a 'message' we log it out
  socket.on("message", function(message: any) {
    console.log(message);
  });
});

server.listen(port, () => console.log(`server is listening on ${port}`));