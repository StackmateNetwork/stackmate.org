/*
cypherpost.io
Developed @ Stackmate India
*/
// ------------------ '(◣ ◢)' ---------------------
import express from "express";
import helmet from "helmet";
import * as http from 'http';
import { logger } from "./lib/logger/winston";
import {router} from "./client/router";
import { respond } from "./lib/http/handler";

const base_path = `/home/node/stackmate.org/app/src/client/public`;

// ------------------ '(◣ ◢)' ---------------------
export async function start(port: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const app = express();
      app.set("etag", false);
      app.disable("x-powered-by");
      app.use(helmet());
      app.use(express.json());
      app.use(express.urlencoded());
      app.use(express.static(base_path));
     
      app.use((err, req, res, next) => {
        // res.setHeader('Access-Control-Allow-Origin', '*');
        if (err) {
          logger.warn({err});
          respond(400,{error:'Invalid Request data format. Try another format like form, or url-encoded.'},res,req)
        } else {
          next()
        }
      });
      const server = http.createServer(app);
      app.use("/", router);
 
      handleGracefulShutdown(server.listen(port, async () => {
        logger.verbose("Server listening...")
        resolve(app)
      }));

    } catch (e) {
      logger.error({EXPRESS_ERROR:e})
      reject(e);
    }
  });
};
// ------------------ '(◣ ◢)' ---------------------
function handleGracefulShutdown(server: http.Server){
  process.on("SIGINT", () => {
    logger.info({
      SIGINT: "Got SIGINT. Gracefully shutting down Http server"
    });
    server.close(() => {
      logger.info("Http server closed.");
    });
  });

  // quit properly on docker stop
  process.on("SIGTERM", () => {
    logger.info({
      SIGTERM: "Got SIGTERM. Gracefully shutting down Http server."
    });

    server.close(() => {
      logger.info("Http server closed.");
    });
  });

  const sockets = {};

  let nextSocketId = 0;

  server.on("connection", socket => {
    const socketId = nextSocketId++;
    sockets[socketId] = socket;

    socket.once("close", function () {
      delete sockets[socketId];
    });
  });
}
// ------------------ '(◣ ◢)' ---------------------
