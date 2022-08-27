import express from "express";
import ordersRouter from "./routes/orders/index.js";
import "dotenv/config";
import { createClient } from "redis";

import suppliersRouter from "./routes/suppliers/index.js";
import SwaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { connectDb } from "./config/db.js";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

//redis

const SwaggerDocument = YAML.load("backend/api.yaml");

const PORT = process.env.PORT;
const app = express();

app.use(cors());
connectDb();
//socket
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:8080",
  },
  /* options */
});

io.on("connection", (socket) => {
  console.log("socket start");

  socket.on("sendNotification", ({ message, orderId }) => {
    io.to(socket.id).emit("getNotification", {
      message,
      orderId,
    });
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//swagger

app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(SwaggerDocument));
app.use("/orders", ordersRouter);
app.use("/suppliers", suppliersRouter);
httpServer.listen(PORT, () =>
  console.log(`application running on port ${PORT}`)
);
