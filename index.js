import express from "express";
import winston from "winston";
import PedidosRouter from "./routes/pedidos.router.js";
import { promises as fs } from "fs";
import cors from "cors";

const app = express();
const { readFile, writeFile } = fs;
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.fileName = "pedidos.json";
global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "delivery-api.log" }),
  ],
  format: combine(label({ label: "delivery-api" }), timestamp(), myFormat),
});

app.use(express.json());
app.use(cors());
app.use("/pedidos", PedidosRouter);

app.listen(3000, async () => {
  try {
    await readFile(global.fileName);
    logger.info("API Started!");
  } catch (err) {
    logger.error(err);
  }
});
