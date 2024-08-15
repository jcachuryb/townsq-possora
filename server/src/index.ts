import express from "express";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";

import { typeDefs } from "./graphql/schemas/schema.js";
import { PostResolver } from "./graphql/resolvers/posts.js";

dotenv.config({ path: "./.env" });

const app = express();
const httpServer = http.createServer(app);
const port = process.env["PORT"] ?? 4000;

const MONGODB_URI = process.env["MONGODB_URI"];

const server = new ApolloServer({
  typeDefs,
  resolvers: [PostResolver],
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
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

await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
console.log(`🚀 Apollo Server ready at http://localhost:${port}/graphql`);
