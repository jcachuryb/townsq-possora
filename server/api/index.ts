import express from "express";
import { ApolloServer } from "@apollo/server";

import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";

import { typeDefs } from "./graphql/schemas/schema.js";
import { PostResolver } from "./graphql/resolvers/posts.js";

const main = async () => {
  dotenv.config({ path: "./.env" });

  const app = express();
  const httpServer = http.createServer(app);
  const port = process.env["PORT"] ?? 4000;

  const MONGODB_URI = process.env["MONGODB_URI"];

  const schema = makeExecutableSchema({ typeDefs, resolvers: [PostResolver] });

  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,

    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await mongoose.connect(MONGODB_URI);
  await server.start();
  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: process.env["CORS_WHITELIST"].split(","),
    }),
    express.json(),
    expressMiddleware(server)
  );

  app.use("/", (req, res) => {
    res.send("Hello Town Square!");
  });

  const whitelist = process.env["CORS_WHITELIST"]
    ? process.env["CORS_WHITELIST"].split(",")
    : ["http://0.0.0.0:3000"];

  const corsOptions = {
    origin: function (origin, callback) {
      if (
        !origin ||
        whitelist.indexOf(origin) !== -1 ||
        whitelist.includes("*")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };
  app.use(cors(corsOptions));

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Apollo Server ready at http://localhost:${port}/graphql`);
};

export default main();
